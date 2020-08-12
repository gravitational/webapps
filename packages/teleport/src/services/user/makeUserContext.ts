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

import { at } from 'lodash';
import makeAcl from './makeAcl';
import { UserContext } from './types';
import { makeCluster } from '../clusters';

export default function makeUserContext(json): UserContext {
  const [username, authType, aclJSON, clusterJSON] = at(json, [
    'userName',
    'authType',
    'userAcl',
    'cluster',
  ]);

  const cluster = makeCluster(clusterJSON);
  const acl = makeAcl(aclJSON);

  return {
    username,
    authType,
    acl,
    cluster,
  };
}
