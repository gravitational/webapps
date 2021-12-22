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
import { Box, Flex } from 'design';
import Select, { DarkStyledSelect } from 'shared/components/Select';
import Document from 'teleterm/ui/Document';
import * as types from 'teleterm/ui/services/docs/types';

export default function DocumentHome(props: PropTypes) {
  const { visible } = props;
  const [selected, setSelected] = React.useState([]);

  const options = [
    { value: 'prod', label: 'prod' },
    { value: 'stage', label: 'stage' },
  ];

  return (
    <Document visible={visible}>
      <Flex flexDirection="column" alignItems="center" flex="1" width="100%">
        <Box width="100%" maxWidth="60%" mt={10}>
          <DarkStyledSelect mb={8}>
            <Select
              value={selected}
              placeholder="Search..."
              onChange={(opt: any) => setSelected(opt)}
              options={options}
              isMulti={false}
              components={{ DropdownIndicator }}
            />
          </DarkStyledSelect>
        </Box>
      </Flex>
    </Document>
  );
}

const DropdownIndicator = () => null;

type PropTypes = {
  visible: boolean;
  doc: types.DocumentHome;
};
