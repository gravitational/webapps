import api from 'teleport/services/api';
import cfg from 'teleport/config';

export type CaptureEventProperties = {
  [key: string]: boolean | string;
};

export type UserEvent = {
  event: string;
  properties?: CaptureEventProperties;
};

export const service = {
  captureUserEvent(userEvent: UserEvent) {
    void api.post(cfg.api.captureUserEventPath, { userEvent });
  },
};
