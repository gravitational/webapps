import React from 'react';
import { State } from './useReAuthenticate';
import { ReAuthenticate } from './ReAuthenticate';

export default {
  title: 'Teleport/ReAuthenticate',
};

export const Loaded = () => <ReAuthenticate {...props} />;

export const Processing = () => (
  <ReAuthenticate {...props} attempt={{ status: 'processing' }} />
);

export const Failed = () => (
  <ReAuthenticate
    {...props}
    attempt={{ status: 'failed', statusText: 'an error has occurred' }}
  />
);

const props: State = {
  attempt: { status: '' },
  clearAttempt: () => null,
  submitWithTotp: () => null,
  submitWithU2f: () => null,
  submitWithWebauthn: () => null,
  preferredMfaType: 'webauthn',
  close: () => null,
  auth2faType: 'on',
};
