// Copyright 2022 Gravitational, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
export class SharedDirectoryManager {
  private dir: FileSystemDirectoryHandle | undefined;

  add(sharedDirectory: FileSystemDirectoryHandle) {
    if (this.dir) {
      throw new Error(
        'SharedDirectoryManager currently only supports sharing a single directory'
      );
    }
    this.dir = sharedDirectory;
  }

  getName(): string {
    this.checkReady();
    return this.dir.name;
  }

  private checkReady() {
    if (!this.dir) {
      throw new Error(
        'attempted to use a shared directory before one was initialized'
      );
    }
  }
}
