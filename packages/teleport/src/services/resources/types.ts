export type Resource<T> = {
  id: string;
  kind: T;
  name: string;
  // content is config in yaml format.
  content: string;
};

export type KindGithubConnector = 'github';
export type KindRole = 'role';
export type KindTrustedCluster = 'trusted_cluster';
