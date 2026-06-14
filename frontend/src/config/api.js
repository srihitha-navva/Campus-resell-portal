//api.js

import axios from "axios";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "")
).replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for JWT cookies
});
