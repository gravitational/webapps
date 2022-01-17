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

import { IAppContext } from 'teleterm/ui/types';

const commands = {
  ssh: {
    displayName: '',
    description: '',
    run(ctx: IAppContext, args: { serverUri: string }) {
      ctx.modalsService.openProxySshDialog(args.serverUri);
    },
  },
  'proxy-db': {
    displayName: '',
    description: '',
    run(ctx: IAppContext, args: { dbUri: string }) {
      ctx.modalsService.openProxyDbDialog(args.dbUri);
    },
  },

  'cluster-login': {
    displayName: '',
    description: '',
    run(ctx: IAppContext, args: { clusterUri?: string }) {
      if (!args.clusterUri) {
        ctx.modalsService.openAddClusterDialog();
      } else {
        ctx.modalsService.openLoginDialog(args.clusterUri);
      }
    },
  },
  'cmd-palette.cluster-login': {
    displayName: 'login',
    description: 'Log in to a cluster and retrieve the session',
    run(appCtx: IAppContext) {
      appCtx.quickInputService.setState({
        picker: appCtx.quickInputService.quickLoginPicker,
        inputValue: '',
      });
    },
  },
  'cmd-palette.ssh': {
    displayName: 'ssh',
    description: 'Run shell or execute a command on a remote SSH node',
    run(appCtx: IAppContext) {
      appCtx.quickInputService.setState({
        picker: appCtx.quickInputService.quickServerPicker,
        inputValue: '',
      });
    },
  },
  'cmd-palette.proxy-db': {
    displayName: 'proxy db',
    description:
      'Start local TLS proxy for database connections when using Teleport',
    run(appCtx: IAppContext) {
      appCtx.quickInputService.setState({
        picker: appCtx.quickInputService.quickDbPicker,
        inputValue: '',
      });
    },
  },
  'cmd-palette.db-ls': {
    displayName: 'db ls',
    description: 'List cluster available databases',
    run(appCtx: IAppContext) {
      appCtx.quickInputService.setState({
        picker: appCtx.quickInputService.quickLoginPicker,
        inputValue: '',
      });
    },
  },
};

export class CommandLauncher {
  appContext: IAppContext;

  constructor(appContext: IAppContext) {
    this.appContext = appContext;
  }

  executeCommand<T extends CommandName>(name: T, args: CommandArgs<T>) {
    commands[name].run(this.appContext, args as any);
  }

  getPaletteCommands() {
    return Object.entries(commands)
      .filter(([key]) => {
        return key.startsWith('cmd-palette');
      })
      .map(([key, value]) => {
        return {
          name: key,
          ...value,
        };
      });
  }
}

type CommandName = keyof typeof commands;
type CommandRegistry = typeof commands;
type CommandArgs<T extends CommandName> = Parameters<
  CommandRegistry[T]['run']
>[1];
