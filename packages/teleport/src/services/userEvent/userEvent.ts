import api from 'teleport/services/api';
import cfg from 'teleport/config';

export type UserEvent = {
  event: string;
  alert?: string;
};

export const service = {
  captureUserEvent(userEvent: UserEvent) {
    void api.post(cfg.api.captureUserEventPath, { userEvent });
  },
};
