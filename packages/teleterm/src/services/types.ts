export type Cluster = {
  uri: string;
  name: string;
  connected: boolean;
  auth: Auth;
};

export type AuthProviderType = 'oidc' | 'saml' | 'github';

export type Auth2faType = 'u2f' | 'otp' | 'off' | 'optional' | 'on';

export type AuthProvider = {
  displayName?: string;
  name: string;
  type: AuthProviderType;
  url: string;
};

export type Auth = {
  providers: AuthProvider[];
  secondFactor: Auth2faType;
};

export type Server = {
  id: string;
  clusterId: string;
  hostname: string;
  tags: string[];
  addr: string;
  tunnel: boolean;
};

export interface Database {
  name: string;
  clusterId: string;
  desc: string;
  title: string;
  protocol: DbProtocol;
  tags: string[];
}

export type DbType = 'redshift' | 'rds' | 'gcp' | 'self-hosted';
export type DbProtocol = 'postgres' | 'mysql' | 'mongodb';
