import React from 'react';
import { Box, ButtonIcon, ButtonPrimary, Flex, Text } from 'design';
import styled from 'styled-components';

import Document from 'teleterm/ui/Document';
import * as types from 'teleterm/ui/services/workspacesService';
import useDocumentBlank from './useDocumentBlank';

import { OpenBox } from 'design/Icon';

export default function Container(props: Props) {
  const { doc, visible } = props;
  const state = useDocumentBlank(doc);
  return (
    <Document visible={visible}>
      <DocumentBlank {...state} />
    </Document>
  );
}

const links = [
  {
    title: 'Resources',
    uri: '/resources/servers',
  },
  {
    title: 'Access Requests',
    uri: '/resources/servers',
  },
];

export function DocumentBlank({
  navigateToResources,
  ...props
}: ReturnType<typeof useDocumentBlank>) {
  return (
    <ScrollingContainer>
      <Box width="100%" m="auto" pb={3} pt={1} px={3}>
        <Flex
          minWidth="370px"
          gap={5}
          pb={5}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          {links.map(link => (
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              key={link.title}
            >
              <LinkButton onClick={() => navigateToResources(link.uri)}>
                <OpenBox fontSize={32} />
              </LinkButton>
              <div>{link.title}</div>
            </Flex>
          ))}
        </Flex>
      </Box>
    </ScrollingContainer>
  );
}

export type DocumentBlankProps = { kind: 'doc.blank' };

const LinkButton = styled(Flex)`
  background: ${props => props.theme.colors.primary.dark};
  width: 100px;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.secondary.main};
  }
`;

const ScrollingContainer = styled(Flex)`
  background: ${props => props.theme.colors.primary.darker};
  width: 100%;
  overflow: auto;
`;

type Props = {
  visible: boolean;
  doc: types.DocumentBlank;
};
