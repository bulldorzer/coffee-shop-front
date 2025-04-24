import axios from "axios";
import { API_SERVER_PORT } from "./utilApi";

// 기본 axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_SERVER_PORT,
});

// 요청 인터셉터: 매 요청마다 최신 토큰을 가져와 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // 토큰이 존재하면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);