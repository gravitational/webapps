export default function generateResourcePath(
  path: string,
  params?: {
    [x: string]: any;
  }
) {
  const processedParams: typeof params = {};
  for (const param in params) {
    if (params[param]?.dir) {
      processedParams[param] = `${params[param].fieldName}:${params[
        param
      ].dir.toLowerCase()}`;
    } else {
      processedParams[param] = params[param]
        ? encodeURIComponent(params[param])
        : '';
    }
  }
  const output = path
    .replace(':clusterId', params.clusterId)
    .replace(':limit?', params.limit)
    .replace(':startKey?', params.startKey || '')
    .replace(':query?', processedParams.query || '')
    .replace(':search?', processedParams.search || '')
    .replace(':sort?', processedParams.sort || '');

  return output;
}
