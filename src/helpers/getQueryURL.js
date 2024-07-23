export const getQueryURL = (rootURL, params) => {
  const esc = encodeURIComponent;
  for (var propName in params) {
    if (params[propName] === null || params[propName] === undefined) {
      delete params[propName];
    }
  }
  const query = Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]?.map((paramsValue) => esc(k) + "=" + esc(paramsValue)).join("&");
      } else {
        return esc(k) + "=" + esc(params[k])
      }
    })
    .join("&");
  return `${rootURL}?${query}`;
};
