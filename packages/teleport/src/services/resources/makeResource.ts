import { Resource, Kind, Label, LabelTag, LabelOption } from './types';

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

export function makeLabelOptions(data = []): LabelOption[] {
  // Test a tags and labels field exist.
  if (!data.length || !data[0].tags || !data[0].labels) {
    return [];
  }

  const tagDict = {};
  data.forEach(({ tags, labels }) => {
    tags.forEach((tag, i) => {
      if (!tagDict[tag]) {
        tagDict[tag] = labels[i];
      }
    });
  });

  return Object.keys(tagDict)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(tag => ({ label: tag, value: tag, obj: tagDict[tag] }));
}
