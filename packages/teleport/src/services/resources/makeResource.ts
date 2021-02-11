import { Resource } from './types';

export function makeResource(json: any): Resource {
  json = json || {};

  return {
    id: json.id,
    kind: json.kind,
    name: json.name,
    content: json.content,
  };
}

export function makeResourceList(json: any) {
  json = json || [];
  return json.map(resource => makeResource(resource));
}
