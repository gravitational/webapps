/*
Copyright 2019 Gravitational, Inc.

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

// eslint-disable-next-line import/named
import { createBrowserHistory, History } from 'history';
import { matchPath } from 'react-router';
import cfg from 'teleport/config';

let _inst: History = null;

const history = {
  original() {
    return _inst;
  },

  init(history?: History) {
    _inst = history || createBrowserHistory();
  },

  replace(route = '') {
    route = this.ensureKnownRoute(route);
    _inst.replace(route);
  },

  push(route, withRefresh = false) {
    route = this.ensureKnownRoute(route);
    if (withRefresh) {
      this._pageRefresh(route);
    } else {
      _inst.push(route);
    }
  },

  reload() {
    window.location.reload();
  },

  goToLogin(rememberLocation = false) {
    let url = cfg.routes.login;
    if (rememberLocation) {
      const { search, pathname } = _inst.location;
      const knownRoute = this.ensureKnownRoute(pathname);
      const knownRedirect = this.ensureBaseUrl(knownRoute);

      // The `search` is the query string part of the redirect URL.
      // We are double encoding this string (minus the question mark)
      // to handle an edge case with SSO logins where the server decodes it
      // and interprets this string as separate from the SSO query param `redirect_url`.
      // The question mark is encoded only once so that react router can
      // correctly interpret it as a query param (it will get decoded once
      // from either the server with SSO flow or from local login flow with "getUrlParameter").
      //
      // In addition, we add a query param flag called `encoded` to help differentiate a query string
      // manipulated by redirect versus a regular page navigation.
      //
      // Example SSO flow:
      // My redirect URL is:
      //   https://cluster.dev/web/nodes?search=some-search-value&sort=name:asc
      // To remember this URL we set it as a query param `redirect_uri`:
      //   https://cluster.dev/web?redirect_uri=https://cluster.dev/web/nodes?search=some-search-value&sort=name:asc
      // With SSO logins, we provide the redirect url with other query params:
      //   https://cluster.dev/v1/webapi/github/login/web?connector_id=some-id&redirect_url=https://cluster.dev/web/nodes?search=some-search-value&sort=name:asc
      //
      // The server will decode once and query split the request URL into `connector_id`, `redirect_url` AND `sort`.
      // Param `sort` is part of the redirect URL and double encoding prevents this misinterpretation.
      let query = '';
      if (search) {
        const splitted = search.split('?');
        if (splitted.length > 1) {
          query = encodeURIComponent(
            `?${encodeURIComponent(`${splitted[1]}&encoded`)}`
          );
        }
      }

      url = `${url}?redirect_uri=${knownRedirect}${query}`;
    }

    this._pageRefresh(url);
  },

  getRedirectParam() {
    return getUrlParameter('redirect_uri', this.original().location.search);
  },

  ensureKnownRoute(route = '') {
    return this._canPush(route) ? route : cfg.routes.root;
  },

  ensureBaseUrl(url: string) {
    url = url || '';
    if (url.indexOf(cfg.baseUrl) !== 0) {
      if (url.startsWith('/')) {
        url = `${cfg.baseUrl}${url}`;
      } else {
        url = `${cfg.baseUrl}/${url}`;
      }
    }

    return url;
  },

  getRoutes() {
    return Object.getOwnPropertyNames(cfg.routes).map(p => cfg.routes[p]);
  },

  getLocation() {
    return this.original().location;
  },

  _canPush(route: string) {
    const knownRoutes = this.getRoutes();
    const { pathname } = new URL(this.ensureBaseUrl(route));

    const match = (known: string) =>
      // only match against pathname
      matchPath(pathname, {
        path: known,
        exact: true,
      });

    return knownRoutes.some(match);
  },

  _pageRefresh(route: string) {
    window.location.href = this.ensureBaseUrl(route);
  },
};

export default history;

export function getUrlParameter(name = '', path = '') {
  const params = new URLSearchParams(path);
  const value = params.get(name);
  return value || '';
}
