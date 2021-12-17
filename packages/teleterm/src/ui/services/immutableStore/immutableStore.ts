import { enableMapSet, produce } from 'immer';
import Store from 'shared/libs/stores/store';
import stateLogger from 'shared/libs/stores/logger';
import { createLogger } from '../../../ui/utils/rendererLogger';

enableMapSet();

export class ImmutableStore<T> extends Store<T> {
  protected logger = createLogger(this.constructor.name);

  // @ts-ignore
  setState(nextState: (draftState: Partial<T>) => T | void): void {
    const prevState = this.state;
    this.state = produce(this.state, nextState);
    stateLogger.logState(this.constructor.name, prevState, 'with', this.state);

    this._subs.forEach(cb => {
      try {
        cb();
      } catch (error) {
        this.logger.error(`Store failed to notify subscriber`, error);
      }
    });
  }
}
