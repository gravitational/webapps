import { Resource } from './types';

export function makeResource<T>(json: any): Resource<T> {
  json = json || {};

  return {
    id: json.id,
    kind: json.kind,
    name: json.name,
    content: json.content,
  };
}

export function makeResourceList<T>(json: any): Resource<T>[] {
  json = json || [];
  return json.map(resource => makeResource(resource));
}
