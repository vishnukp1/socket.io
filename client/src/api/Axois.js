import axios from "axios"
const token = localStorage.getItem("token")

export const Axios = axios.create({
  baseURL: 'http://localhost:3033',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});