import moment from 'moment';
import { displayDate } from 'shared/services/loc';
import { MfaDevice } from './types';

export default function makeMfaDevice(json): MfaDevice {
  const { id, name, lastUsed, addedAt } = json;

  let type: MfaDevice['type'];
  if (json.type === 'TOTP') {
    type = 'Authenticator App';
  }
  if (json.type === 'U2F') {
    type = 'Hardware Key';
  }

  return {
    id,
    name,
    type,
    registeredDate: moment(addedAt).unix(),
    lastUsedDate: moment(lastUsed).unix(),
    registeredDateText: displayDate(addedAt),
    lastUsedDateText: displayDate(lastUsed),
  };
}
