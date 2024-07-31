import axios from "axios"


export const Axios = axios.create({
  baseURL: 'http://localhost:3033',
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed (e.g., Authorization)
  },
});