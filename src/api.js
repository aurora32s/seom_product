const API_ENDPOINT = 'https://kdt.roto.codes';

export const request = (url) => {
  return fetch(`${API_ENDPOINT}${url.startsWith('/') ? url : `/${url}`}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} Error`);
    })
    .catch((exception) => alert(exception.message));
};
