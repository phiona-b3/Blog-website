import axios from 'axios';

const domain = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
//This line checks if the app is running in a production environment. If so, it uses an empty string ('') for the domain, which implies the frontend and backend are served from the same domain.

//HTTP function
const http = (url, { method = 'GET', data = undefined }) => {
  //The URL is prefixed with the domain variable, allowing for flexible URL handling based on the environment.
  return axios({
    url: `${domain}${url}`,
    method,
    data,
  })
}

//HTTP Method Functions
const get = (url, opts = {}) => http(url, { ...opts });
const post = (url, opts = {}) => http(url, { method: 'POST', ...opts });
const put = (url, opts = {}) => http(url, { method: 'PUT', ...opts });
const deleteData = (url, opts = {}) => http(url, { method: 'DELETE', ...opts });

const methods = {
  get,
  post,
  put,
  delete: deleteData,
}

export default methods;
