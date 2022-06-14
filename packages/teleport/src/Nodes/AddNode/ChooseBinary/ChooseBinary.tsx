import React, { useState } from 'react';
import { getDownloadLink } from 'teleport/services/links';

import { Apple, Linux } from 'design/Icon';
import { Box, Flex, Link, Text } from 'design';
import NextButton from '../NextButton';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

import type { Arch } from 'teleport/services/links';

export function ChooseBinary({
  next,
  refCallback,
  isEnterprise = false,
  version,
}: ChooseBinaryProps) {
  const [activeBinary, setActiveBinary] = useState<Arch>('deb');

  const downloadLink = getDownloadLink(activeBinary, version, isEnterprise);

  return (
    <Box ref={refCallback}>
      <Text bold as="span">
        Step 1
      </Text>{' '}
      <Text as="span">- Select OS</Text>
      <Box mt={3}>
        <Flex style={{ gap: '0.5rem' }}>
          <BinaryLink
            type="macos"
            label="MacOS"
            active={activeBinary === 'macos'}
            setActive={setActiveBinary}
          />
          <BinaryLink
            active={activeBinary === 'deb'}
            type="deb"
            label="Linux amd64"
            subLabel="(Debian/Ubuntu)"
            setActive={setActiveBinary}
          />
          <BinaryLink
            active={activeBinary === 'rpm'}
            type="rpm"
            label="Linux amd64"
            subLabel="(RHEL/CentOS)"
            setActive={setActiveBinary}
          />
        </Flex>
      </Box>
      <Text mt={3}>
        Don't see yours?{' '}
        <Link href="https://goteleport.com/download/" target="_blank">
          Find more here
        </Link>
        .
      </Text>
      <TextSelectCopy text={`curl -O ${downloadLink}`} mt={3} mb={3} />
      <NextButton next={next} />
    </Box>
  );
}

type ChooseBinaryProps = {
  refCallback(node: HTMLElement): void;
  next(): void;
  isEnterprise?: boolean;
  version: string;
};

function BinaryLink({
  active = false,
  type,
  label,
  subLabel,
  setActive,
}: {
  active?: boolean;
  type: Arch;
  label: string;
  subLabel?: string;
  setActive(Arch): void;
}) {
  return (
    <Flex
      justifyContent="center"
      height="86px"
      alignItems="center"
      flexDirection="column"
      style={{
        backgroundColor: active ? '#512FC9' : 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        cursor: 'pointer',
        flexBasis: 0,
        flexGrow: 1,
        opacity: active ? 1 : 0.6,
        textDecoration: 'none',
        color: 'white',
      }}
      onClick={() => setActive(type)}
    >
      {type === 'macos' ? <Apple /> : <Linux />}
      <Text bold>{label}</Text>
      <Text>{subLabel}</Text>
    </Flex>
  );
}
