export type RenewSessionRequest = {
  requestId?: string;
  switchback?: boolean;
};

export type BearerToken = {
  accessToken: string;
  expiresIn: string;
  created: number;
  // idleTimeout is max time in milliseconds
  // a user can be idle before getting logged out.
  idleTimeout: number;
};

export type Session = {
  token: BearerToken;
  expires: Date;
};
