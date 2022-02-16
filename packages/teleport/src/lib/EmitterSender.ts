import { EventEmitter } from 'events';

class EmitterSender extends EventEmitter {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(data: string) {
    throw new Error('Not implemented');
  }
}

export { EmitterSender };
