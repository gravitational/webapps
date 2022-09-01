import React from 'react';

import { AnimatedTerminal } from 'shared/components/AnimatedTerminal';

import cfg from 'teleport/config';

import { generateCommand } from 'teleport/Discover/Desktop/ConfigureActiveDirectory/ConfigureActiveDirectory';

const lines = [
  {
    text: generateCommand(cfg.getConfigureADUrl()),
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

export function TerminalAnimation() {
  return (
    <AnimatedTerminal
      lines={lines}
      startDelay={800}
      keywords={keywords}
      args={args}
    />
  );
}
