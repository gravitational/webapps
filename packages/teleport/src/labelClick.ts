import { Label } from 'teleport/services/resources';
import { ResourceUrlQueryParams } from './getUrlQueryParams';

export default function labelClick(
  label: Label,
  isAdvancedSearch: boolean,
  setIsAdvancedSearch: (isAdvancedSearch: boolean) => void,
  searchString: string,
  setSearchString: (searchString: string) => void,
  params: ResourceUrlQueryParams,
  setParams: (params: ResourceUrlQueryParams) => void
) {
  const queryParts: string[] = [];

  // Add existing query
  if (searchString && isAdvancedSearch) {
    queryParts.push(searchString);
  }

  // If there is an existing simple search, convert it to predicate language and add it
  if (searchString && !isAdvancedSearch) {
    queryParts.push(`search("${searchString}")`);
  }

  const labelQuery = `labels["${label.name}"] == "${label.value}"`;
  queryParts.push(labelQuery);

  const finalQuery = queryParts.join(' && ');

  setParams({ ...params, search: '', query: finalQuery });
  setIsAdvancedSearch(true);
  setSearchString(finalQuery);
}
