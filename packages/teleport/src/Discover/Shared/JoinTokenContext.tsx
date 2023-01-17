import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useTeleport } from 'teleport';

import {
  ResourceKind,
  resourceKindToJoinRole,
} from 'teleport/Discover/Shared/ResourceKind';

import type { AgentLabel } from 'teleport/services/agents';
import type { JoinToken, JoinMethod } from 'teleport/services/joinToken';

interface JoinTokenContextState {
  joinToken: JoinToken;
  setJoinToken: (joinToken: JoinToken) => void;
  timeout: number;
  timedOut: boolean;
  startTimer: () => void;
  id?: number;
}

const joinTokenContext = React.createContext<JoinTokenContextState>(null);

export function JoinTokenProvider(props: {
  timeout: number;
  children?: React.ReactNode;
}) {
  const [joinToken, setJoinToken] = useState<JoinToken>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeout, setTokenTimeout] = useState<number>(null);

  useEffect(() => {
    if (!timeout) {
      return;
    }

    if (timeout > Date.now()) {
      setTimedOut(false);

      const id = window.setTimeout(
        () => setTimedOut(true),
        timeout - Date.now()
      );

      return () => clearTimeout(id);
    }
  }, [timeout]);

  const startTimer = useCallback(() => {
    setTokenTimeout(Date.now() + props.timeout);
  }, [props.timeout]);

  return (
    <joinTokenContext.Provider
      value={{ joinToken, setJoinToken, timeout, startTimer, timedOut }}
    >
      {props.children}
    </joinTokenContext.Provider>
  );
}

interface PromiseResult {
  promise?: Promise<any>;
  response?: JoinToken;
  error?: Error;
}

interface CachedPromiseResult {
  promise: PromiseResult;
  expires: Date;
}

let abortController: AbortController;
let joinTokenCache = new Map<ResourceKind, CachedPromiseResult>();

export function clearCachedJoinTokenResult(resourceKind: ResourceKind) {
  joinTokenCache.delete(resourceKind);
}

export function useJoinTokenValue() {
  const tokenContext = useContext(joinTokenContext);

  return tokenContext.joinToken;
}

export function useJoinToken(
  resourceKind: ResourceKind,
  suggestedAgentMatcherLabels: AgentLabel[] = [],
  joinMethod: JoinMethod = 'token'
): {
  joinToken: JoinToken;
  reloadJoinToken: () => void;
  timedOut: boolean;
  timeout: number;
} {
  const ctx = useTeleport();
  const tokenContext = useContext(joinTokenContext);

  function run() {
    abortController = new AbortController();

    const result = {
      response: null,
      error: null,
      promise: ctx.joinTokenService
        .fetchJoinToken(
          {
            roles: [resourceKindToJoinRole(resourceKind)],
            method: joinMethod,
            suggestedAgentMatcherLabels,
          },
          abortController.signal
        )
        .then(token => {
          // Probably will never happen, but just in case, otherwise
          // querying for the resource can return a false positive.
          if (!token.internalResourceId) {
            throw new Error(
              'internal resource ID is required to discover the newly added resource, but none was provided'
            );
          }
          result.response = token;
          tokenContext.setJoinToken(token);
          tokenContext.startTimer();
        })
        .catch(error => {
          result.error = error;
        }),
    };

    joinTokenCache.set(resourceKind, {
      promise: result,
      expires: new Date(Date.now() + tokenContext.timeout),
    });

    return result;
  }

  useEffect(() => {
    return () => {
      abortController?.abort();
    };
  }, []);

  const existing = joinTokenCache.get(resourceKind);

  if (existing) {
    if (existing.expires.getTime() < Date.now()) {
      if (existing.promise.error) {
        throw existing.promise.error;
      }

      if (existing.promise.response) {
        return {
          joinToken: existing.promise.response,
          reloadJoinToken() {
            joinTokenCache.delete(resourceKind);
            run();
          },
          timedOut: tokenContext.timedOut,
          timeout: tokenContext.timeout,
        };
      }

      throw existing.promise.promise;
    }

    joinTokenCache.delete(resourceKind);
  }

  throw run().promise;
}
