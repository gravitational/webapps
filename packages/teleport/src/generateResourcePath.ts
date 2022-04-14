import { generatePath } from 'react-router';

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
      processedParams[param] = params[param] ? params[param] : null;
    }
  }

  return generatePath(path, processedParams);
}
