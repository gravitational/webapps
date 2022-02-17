import { EventEmitter } from 'events';
import { WebauthnAssertionResponse } from 'teleport/services/auth';

class EventEmitterMfaSender extends EventEmitter {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendWebAuthn(data: WebauthnAssertionResponse) {
    throw new Error('Not implemented');
  }
}

export { EventEmitterMfaSender as EventEmitterMfaSender };
