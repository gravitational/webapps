/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import 'whatwg-fetch';
import localStorage from '../localStorage';
import parseError, { ApiError } from './parseError';

const fetchWithAuth = (url: string, params: RequestInit = {}) => {
  const fullUrl = window.location.origin + url;

  const options: RequestInit = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...getAuthHeaders(),
    },
    mode: 'same-origin',
    cache: 'no-store',
    ...params,
  };

  // native call
  return fetch(fullUrl, options);
};

const api = {
  get(url: string, abortSignal?: AbortSignal): Promise<any> {
    return api.fetchJson(url, { signal: abortSignal });
  },

  post(url: string, data?: unknown): Promise<any> {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'POST',
    });
  },

  delete(url: string, data?: unknown): Promise<any> {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'DELETE',
    });
  },

  put(url: string, data?: unknown): Promise<any> {
    return api.fetchJson(url, {
      body: JSON.stringify(data),
      method: 'PUT',
    });
  },

  fetchJson(url: string, params: RequestInit = {}) {
    return new Promise((resolve, reject) => {
      fetchWithAuth(url, params)
        .then(response => {
          if (response.ok) {
            return response
              .json()
              .then(json => resolve(json))
              .catch(err => reject(new ApiError(err.message, response)));
          } else {
            return response
              .json()
              .then(json => reject(new ApiError(parseError(json), response)))
              .catch(() => {
                reject(
                  new ApiError(`${response.status} - ${response.url}`, response)
                );
              });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

export function getAuthHeaders() {
  const accessToken = getAccessToken();
  const csrfToken = getXCSRFToken();
  return {
    'X-CSRF-Token': csrfToken,
    Authorization: `Bearer ${accessToken}`,
  };
}

export function getNoCacheHeaders() {
  return {
    'cache-control': 'max-age=0',
    expires: '0',
    pragma: 'no-cache',
  };
}

export const getXCSRFToken = () => {
  const metaTag = document.querySelector('[name=grv_csrf_token]');
  return metaTag instanceof HTMLMetaElement ? metaTag.content || '' : '';
};

export function getAccessToken() {
  const bearerToken = localStorage.getBearerToken();
  return bearerToken?.accessToken;
}

export function getHostName() {
  return location.hostname + (location.port ? ':' + location.port : '');
}

export default api;
