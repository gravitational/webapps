import api from 'teleport/services/api';
import cfg from 'teleport/config';

export type UserEvent = {
  event: string;
  alert?: string;
};

export const service = {
  captureUserEvent(userEvent: UserEvent) {
    // using api.fetch instead of api.fetchJSON
    // because we are not expecting a JSON response
    void api.fetch(cfg.api.captureUserEventPath, {
      method: 'POST',
      body: JSON.stringify({ ...userEvent }),
    });
  },
};
