import { KeyboardShortcutsService } from './keyboardShortcutsService';

describe('teleterm/ui/services/keyboardShortcutsService', () => {
  it('should call subscriber on event', () => {
    const { subscriber } = getTestSetup();
    dispatchEventCommand1();
    expect(subscriber).toHaveBeenCalledWith({ type: 'tab-1' });
  });

  it('should not call subscriber on unknown event', () => {
    const { subscriber } = getTestSetup();
    dispatchEvent(
      new KeyboardEvent('keydown', { metaKey: true, altKey: true, key: 'M' })
    );
    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should use overridden shortcuts', () => {
    const { service, subscriber } = getTestSetup();

    service.updateShortcuts({ 'tab-1': 'Control-1' });
    dispatchEventCommand1();
    expect(subscriber).not.toHaveBeenCalled();

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: '1' }));
    expect(subscriber).toHaveBeenCalledWith({ type: 'tab-1' });
  });

  it('should not call subscriber after it has been unsubscribed', () => {
    const { service, subscriber } = getTestSetup();
    service.unsubscribeFromEvents(subscriber);
    dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: '1' }));
    expect(subscriber).not.toHaveBeenCalled();
  });
});

function getTestSetup() {
  const service = new KeyboardShortcutsService('darwin');
  const subscriber = jest.fn();
  service.updateShortcuts({ 'tab-1': 'Command-1' });
  service.subscribeToEvents(subscriber);
  return { service, subscriber };
}

function dispatchEventCommand1() {
  dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: '1' }));
}
