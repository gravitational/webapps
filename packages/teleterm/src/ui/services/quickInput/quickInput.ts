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

import { Store, useStore } from 'shared/libs/stores';
import CommandLauncher from 'teleterm/ui/commandLauncher';
import ServiceClusters from 'teleterm/ui/services/clusters';
import * as pickers from './quickPickers';
import { QuickInputPicker } from './types';

type State = {
  picker: QuickInputPicker;
  inputValue: string;
};

export default class QuickInputService extends Store<State> {
  quickCmdPicker: pickers.QuickCmdPicker;
  quickLoginPicker: pickers.QuickLoginPicker;
  quickDbPicker: pickers.QuickDbPicker;
  quickServerPicker: pickers.QuickServerPicker;

  constructor(launcher: CommandLauncher, serviceClusters: ServiceClusters) {
    super();
    this.quickDbPicker = new pickers.QuickDbPicker(launcher, serviceClusters);
    this.quickServerPicker = new pickers.QuickServerPicker(
      launcher,
      serviceClusters
    );
    this.quickCmdPicker = new pickers.QuickCmdPicker(launcher);
    this.quickLoginPicker = new pickers.QuickLoginPicker(
      launcher,
      serviceClusters
    );
    this.reset();
  }

  state: State = {
    picker: null,
    inputValue: '',
  };

  reset = () => {
    this.setState({ picker: this.quickCmdPicker, inputValue: '' });
  };

  setInputValue = (value: string) => {
    this.setState({
      inputValue: value,
    });
  };

  useState() {
    return useStore<QuickInputService>(this).state;
  }
}
