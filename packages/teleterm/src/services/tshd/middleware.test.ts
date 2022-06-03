import { InterceptingCall, InterceptorOptions } from '@grpc/grpc-js';
import { withLogging } from './middleware';
import Logger from 'teleterm/logger';

it('do not log sensitive info like password', () => {
  const infoLogger = jest.fn();
  Logger.init({
    pipeProcessOutputIntoLogger: () => {},
    createLogger: () => ({
      info: infoLogger,
      error: () => {},
      warn: () => {},
    }),
  });
  const loggingMiddleware = withLogging(new Logger())(
    { method_definition: { path: 'LogIn' } } as InterceptorOptions,
    () =>
      ({
        sendMessageWithContext: () => {},
      } as unknown as InterceptingCall)
  );

  loggingMiddleware.sendMessage({
    toObject: () => ({
      passw: {},
      userData: {
        login: 'admin',
        password: 'admin',
      },
    }),
  });

  expect(infoLogger).toHaveBeenCalledWith(
    'send: LogIn({"passw":"~FILTERED~","userData":{"login":"admin","password":"~FILTERED~"}})'
  );
});
