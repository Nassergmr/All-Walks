import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_API_AUTH,
  },
});

export default axiosInstance;
