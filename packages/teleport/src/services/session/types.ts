export type RenewSessionRequest = {
  requestId?: string;
  expires?: Date;
  roles?: string[];
};

export class BearerToken {
  accessToken: string;
  expiresIn: string;
  created: number;
  session: Session;

  constructor(json) {
    this.accessToken = json.token;
    this.expiresIn = json.expires_in;
    this.created = new Date().getTime();

    this.session = {
      expires: json.session.expires,
      roles: json.session.roles,
    };
  }
}

export interface Session {
  expires: Date;
  roles: string[];
}
