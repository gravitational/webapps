/*
Copyright 2021 Gravitational, Inc.

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

import api from 'teleport/services/api';
import cfg, { UrlResourcesParams } from 'teleport/config';
import makeDesktop from './makeDesktop';
import { DesktopsResponse } from './types';

class DesktopService {
  fetchDesktops(
    clusterId: string,
    params: UrlResourcesParams
  ): Promise<DesktopsResponse> {
    return api.get(cfg.getDesktopsUrl(clusterId, params)).then(json => {
      const items = json?.items || [];

      return {
        desktops: items.map(makeDesktop),
        startKey: json?.startKey,
        totalCount: json?.totalCount,
        paginationUnsupported:
          json?.startKey === null && json?.totalCount === null,
      };
    });
  }

  fetchDesktop(clusterId: string, desktopPath: string) {
    return api
      .get(cfg.getDesktopUrl(clusterId, desktopPath))
      .then(json => makeDesktop(json));
  }

  checkDesktopIsActive(
    clusterId: string,
    desktopName: string
  ): Promise<boolean> {
    return api
      .get(cfg.getDesktopIsActiveUrl(clusterId, desktopName))
      .then(json => json.active);
  }
}

const desktopService = new DesktopService();

export default desktopService;
