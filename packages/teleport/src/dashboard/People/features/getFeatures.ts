/*
Copyright 2020 Gravitational, Inc.

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

import TeleportContext from 'teleport/teleportContext';
import FeatureRoles from './featureRoles';
import FeatureUsers from './featureUsers';

export default function getFeatures(ctx: TeleportContext) {
  const features: Feature[] = [];
  if (ctx.isRolesEnabled()) {
    features.push(new FeatureRoles());
  }

  if (ctx.isUsersEnabled()) {
    features.push(new FeatureUsers());
  }

  return features;
}

export interface Feature {
  route: {
    exact?: boolean;
    title: string;
    path: string;
    component(props: any): JSX.Element;
  };

  navItem: {
    exact?: boolean;
    title: string;
    Icon: any;
    to: string;
  };
}
