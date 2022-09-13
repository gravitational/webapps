import React from 'react';

import { AnimatedTerminal } from 'shared/components/AnimatedTerminal';

import cfg from 'teleport/config';

import { generateCommand } from 'teleport/Discover/Shared/generateCommand';

const lines = (token: string) => [
  {
    text: generateCommand(cfg.getConfigureADUrl(token)),
    isCommand: true,
  },
  {
    text: 'Running...',
    isCommand: false,
    delay: 800,
  },
  {
    text: 'Desktop Access Configuration Reference: https://goteleport.com/docs/desktop-access/reference/configuration/',
    isCommand: false,
    delay: 500,
  },
  {
    text: `
teleport:
  data_dir: /var/lib/teleport
  auth_token: thisisanexample
  auth_servers:
    - your.teleport.cluster:3025
windows_desktop_service:
   enabled: yes
   listen_addr: "0.0.0.0:3028"
   ldap:
     addr:     '0.0.0.0:636'
     domain:   'TELEPORT'
     username: 'you'
     insecure_skip_verify: false
     ldap_ca_cert: "----THIS IS AN EXAMPLE----"
   discovery:
     base_dn: '*'`,
    isCommand: false,
    delay: 500,
  },
  {
    text: '',
    isCommand: true,
  },
];

const keywords = ['Invoke-WebRequest', 'Invoke-Expression'];

const args = ['-Uri'];

const selectedLines = {
  start: 6,
  end: 21,
};

interface TerminalAnimationProps {
  isCopying: boolean;
  token: string;
}

export function TerminalAnimation(props: TerminalAnimationProps) {
  return (
    <AnimatedTerminal
      lines={lines(props.token)}
      startDelay={800}
      keywords={keywords}
      args={args}
      selectedLines={props.isCopying ? selectedLines : null}
      stopped={props.isCopying}
    />
  );
}
