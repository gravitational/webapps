import { Resource, Kind, Label, LabelTag } from './types';

export function makeResource<T extends Kind>(json: any): Resource<T> {
  json = json || {};

  return {
    id: json.id,
    kind: json.kind,
    name: json.name,
    content: json.content,
  };
}

export function makeResourceList<T extends Kind>(json: any): Resource<T>[] {
  json = json || [];
  return json.map(resource => makeResource<T>(resource));
}

export function makeLabelTag(label: Label): LabelTag {
  return `${label.name}: ${label.value}`;
}
