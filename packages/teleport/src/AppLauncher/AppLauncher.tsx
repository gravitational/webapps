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

import React, { useCallback, useEffect } from 'react';

import { useLocation, useParams } from 'react-router';

import { Flex, Indicator } from 'design';

import { AccessDenied } from 'design/CardError';

import useAttempt from 'shared/hooks/useAttemptNext';

import { UrlLauncherParams } from 'teleport/config';
import service from 'teleport/services/apps';

export function AppLauncher() {
  const { attempt, setAttempt } = useAttempt('processing');

  const params = useParams<UrlLauncherParams>();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const createAppSession = useCallback(async (params: UrlLauncherParams) => {
    try {
      let fqdn = params.fqdn;
      if (!fqdn) {
        const app = await service.getAppFqdn(params);

        fqdn = app.fqdn;
      }

      const port = location.port ? `:${location.port}` : '';
      const session = await service.createAppSession(params);

      await fetch(`https://${fqdn}${port}/x-teleport-auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Cookie-Value': session.cookieValue,
          'X-Subject-Cookie-Value': session.subjectCookieValue,
        },
      });

      let path = '';
      if (queryParams.has('path')) {
        path = decodeURIComponent(queryParams.get('path'));

        if (!path.startsWith('/')) {
          path = `/${path}`;
        }
      }

      window.location.replace(`https://${fqdn}${port}${path}`);
    } catch (err) {
      let statusText = 'Something went wrong';
      if (err instanceof Error) {
        statusText = err.message;
      }

      setAttempt({
        status: 'failed',
        statusText,
      });
    }
  }, []);

  useEffect(() => {
    createAppSession(params);
  }, [params]);

  if (attempt.status === 'failed') {
    return <AppLauncherAccessDenied statusText={attempt.statusText} />;
  }

  return <AppLauncherProcessing />;
}

export function AppLauncherProcessing() {
  return (
    <Flex height="180px" justifyContent="center" alignItems="center" flex="1">
      <Indicator />
    </Flex>
  );
}

interface AppLauncherAccessDeniedProps {
  statusText: string;
}

export function AppLauncherAccessDenied(props: AppLauncherAccessDeniedProps) {
  return <AccessDenied message={props.statusText} />;
}
