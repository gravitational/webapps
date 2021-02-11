export type Resource = {
  id: string;
  kind: ResourceKind;
  name: string;
  // content is config in yaml format.
  content: string;
};

export type ResourceKind =
  | 'saml'
  | 'oidc'
  | 'github'
  | 'role'
  | 'auth_connector'
  | 'trusted_cluster';
