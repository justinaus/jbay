import queryString from 'query-string';

export function makePathWithQuery(apiPath, id, query) {
  const stringified = queryString.stringify(query);

  let path = `${apiPath}/${id}`;
  if (stringified) {
    path += `?${stringified}`;
  }

  return path;
}
