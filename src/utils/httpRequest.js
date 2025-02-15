import axios from 'axios';

const env = import.meta.env;

const httpRequest = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpRequest;
