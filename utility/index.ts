export const queryToString = (query: undefined | string | string[]) =>
  Array.isArray(query) ? query[0] : query ?? null;
