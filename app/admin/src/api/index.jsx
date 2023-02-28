const BASE_API = "http://abine.herokuapp.com";
// const BASE_API = "http://localhost:5000";

const ERROR_CODES = [401, 404, 403, 500];

const postData = async (path = '', data = {}) => {
  // Default options are marked with *
  const FETCH_API = `${BASE_API}${path}`;
  const response = await fetch(FETCH_API, {
    method: 'POST', 
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}
const getData = async (path = '', headers = {}) => {
  // Default options are marked with *
  const FETCH_API = `${BASE_API}${path}`;
  const response = await fetch(FETCH_API, {
    method: 'GET', 
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

const PostOrPut = async (route, method, body = {}, headers = {}, params = {}) => {
  const paramString = new URLSearchParams(params).toString();

  // let headerSend = uploadFile?: headers;
  // console.log(headerSend);
  const response = await fetch(`${BASE_API}/${route}?${paramString}`, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers:  {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
    body: JSON.stringify(body),
  });

  return response.json();
}

const GetOrDelete = async (route, method = "GET", headers = {}, params = {}) => {
  const paramString = new URLSearchParams(params).toString();
  // let headerSend = uploadFile? : headers;
  const response = await fetch(`${BASE_API}/${route}?${paramString}`, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
  });
  return response.json();
}

export {
  postData,
  getData,
  PostOrPut,
  GetOrDelete,
  ERROR_CODES,
  BASE_API,
};