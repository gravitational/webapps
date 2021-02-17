/*
Copyright 2019-2021 Gravitational, Inc.

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
import { LoginFailed as CardFailed } from 'design/CardError';
import LogoHero from 'teleport/components/LogoHero';
import cfg from 'teleport/config';

export default function LoginFailed({ isCallbackErr }: Props) {
  let message = "unable to login, please check Teleport's log for details";

  if (isCallbackErr) {
    message = 'unable to process callback';
  }

  return (
    <>
      <LogoHero />
      <CardFailed loginUrl={cfg.routes.login} message={message} />
    </>
  );
}

type Props = {
  isCallbackErr?: boolean;
};
