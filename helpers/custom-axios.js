import axios from 'axios';

export const axiosNoAuth = axios.create({
  baseURL: process.env.API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'REQUEST-TYPE': 'API',
  },
});

module.exports = {
  axiosNoAuth,
};
