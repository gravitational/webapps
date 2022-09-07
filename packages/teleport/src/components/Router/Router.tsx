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

import React from 'react';

import { useParams } from 'react-router';
import { Route as RouterRoute, Switch as RouterSwitch } from 'react-router-dom';

import { NotFound } from 'design/CardError';

const NoMatch = () => (
  <NotFound
    alignSelf="baseline"
    message="The requested path could not be found."
  />
);

// Adds default not found handler
const Switch = props => (
  <RouterSwitch>
    {props.children}
    <Route component={NoMatch} />
  </RouterSwitch>
);

const Route = props => {
  const { title = '', ...rest } = props;
  const { clusterId } = useParams<{ clusterId: string }>();

  React.useEffect(() => {
    if (title && clusterId) {
      document.title = `${clusterId} • ${title}`;
    } else if (title) {
      document.title = `${title}`;
    }
  }, [title]);

  return <RouterRoute {...rest} />;
};

export { NavLink, Redirect } from 'react-router-dom';
export {
  useRouteMatch,
  useParams,
  useLocation,
  withRouter,
  Router,
} from 'react-router';

export { Route, Switch };
