/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Label, TagDict } from './types';

// makeResourceTags takes a list of resource labels and converts them to
// tag format `name: value`. Unique tags will be stored in the tagMap.
export function makeResourceTags(labels: Label[] = [], tagDict: {}) {
  return labels.map(label => {
    const tag = `${label.name}: ${label.value}`;
    if (!tagDict[tag]) {
      tagDict[tag] = label;
    }

    return tag;
  });
}
