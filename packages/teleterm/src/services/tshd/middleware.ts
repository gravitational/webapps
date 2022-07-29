import * as grpc from '@grpc/grpc-js';

import { isObject, transform } from 'lodash';

import Logger from 'teleterm/logger';

const SENSITIVE_PROPERTIES = ['passw'];

export type UnaryInterceptor = (
  options: grpc.InterceptorOptions,
  nextCall: (options: grpc.InterceptorOptions) => grpc.InterceptingCall
) => grpc.InterceptingCall;

// This is custom grpc middleware implementation that uses JS Proxy to intercept method calls
// Curtesy of https://github.com/echo-health/node-grpc-interceptors/blob/master/client-proxy.js
export default function middleware<T extends Record<string, any>>(
  client: T,
  interceptors: UnaryInterceptor[]
) {
  return new Proxy(client, {
    get(target, propKey: any) {
      // store the original func being called
      const origFunc = target[propKey];

      // IMPORTANT - we only want to intercept gRPC request functions!
      // Validate this is a gRPC request func by checking the object for
      // a requestSerialize() function
      let grpcMethod = false;
      for (const k in origFunc) {
        if (k === 'requestSerialize' && typeof origFunc[k] === 'function') {
          grpcMethod = true;
          break;
        }
      }

      // if this doesn't look like a gRPC request func, return the original func
      if (!grpcMethod) {
        return function (...args) {
          return origFunc.call(target, ...args);
        };
      }

      // setup the original method with provided interceptors
      return function (...args) {
        let message, options, callback;

        if (args.length >= 3) {
          message = args[0];
          options = args[1];
          callback = args[2];
        } else {
          message = args[0] || undefined;
          callback = args[1] || undefined;
        }

        if (!options) {
          options = {};
        }

        if (!(options.interceptors && Array.isArray(options.interceptors))) {
          options.interceptors = [];
        }

        options.interceptors = options.interceptors.concat(interceptors);

        return origFunc.call(target, message, options, callback);
      };
    },
  });
}

export const withLogging = (logger: Logger): UnaryInterceptor => {
  return (options, nextCall) => {
    const method = options.method_definition.path;
    const params: grpc.Requester = {
      start(metadata, listener, next) {
        next(metadata, {
          onReceiveMetadata(metadata, next) {
            next(metadata);
          },

          onReceiveMessage(message, next) {
            const json = message
              ? filterSensitiveProperties(message.toObject())
              : null;
            logger.info(`receive: ${method} -> (${JSON.stringify(json)})`);
            next(message);
          },

          onReceiveStatus(status, next) {
            if (status.code !== grpc.status.OK) {
              logger.error(`receive: ${method} -> (${status.details})`);
            }

            next(status);
          },
        });
      },

      sendMessage(message, next) {
        logger.info(
          `send: ${method}(${JSON.stringify(
            filterSensitiveProperties(message.toObject())
          )})`
        );
        next(message);
      },
    };

    return new grpc.InterceptingCall(nextCall(options), params);
  };
};

function filterSensitiveProperties(toFilter: object): object {
  return transform(
    toFilter,
    (result: object, value: any, key: any) => {
      if (
        SENSITIVE_PROPERTIES.some(
          sensitiveProp =>
            typeof key === 'string' && key.includes(sensitiveProp)
        )
      ) {
        result[key] = '~FILTERED~';
        return;
      }
      if (isObject(value)) {
        result[key] = filterSensitiveProperties(value);
        return;
      }
      result[key] = value;
    },
    {}
  );
}
