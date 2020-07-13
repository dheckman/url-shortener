
const API_KEY = '9cbf35cea238058ab2470f973abc633a';

function objectToQueryString(obj) {
  return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&');
}

async function request(url, params, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'GB-Access-Token': API_KEY
    },
  };

  if (params) {
    if (method === 'GET') {
      url += `?${objectToQueryString(params)}`;
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const result = await fetch(url, options)
  .then(async (response) => {
    if (!response.ok) { throw response }
    if (method === 'DELETE') {
      return response;
    }
      return response.json()
  })
  return result; 
}

function get(url, params) {
  return request(url, params);
}

function create(url, params) {
  return request(url, params, 'POST');
}

function remove(url, params) {
  return request(url, params, 'DELETE');
}

export default {
  get,
  create,
  remove,
};
