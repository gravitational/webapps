import { MfaDevice } from './types';

export default function makeMfaDevice(json): MfaDevice {
  const { id, name, lastUsed, addedAt } = json;

  let typeText: MfaDevice['typeText'];
  if (json.type === 'TOTP') {
    typeText = 'Authenticator App';
  }
  if (json.type === 'U2F') {
    typeText = 'Hardware Key';
  }

  const registeredDate = new Date(addedAt);
  const lastUsedDate = new Date(lastUsed);

  return {
    id,
    name,
    typeText,
    registeredDate,
    lastUsedDate,
  };
}
