const api = 'http://abine.herokuapp.com';

function PostOrPut(route, method, body = {}, headers = {}, params = {}) {
    const paramString = new URLSearchParams(params).toString();
  
    return fetch(`${api}/${route}?${paramString}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method,
      body: JSON.stringify(body),
    });
  }
  function GetOrDelete(route, method, headers = {}, params = {}) {
    const paramString = new URLSearchParams(params).toString();
  
    return fetch(`${api}/${route}?${paramString}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method,
    });
  }
  export {PostOrPut,GetOrDelete};