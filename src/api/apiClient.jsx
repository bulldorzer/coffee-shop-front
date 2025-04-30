// src/api/apiClient.js
import axios from "axios";
import { API_SERVER_PORT } from "./utilApi";

// 기본 설정된 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${API_SERVER_PORT}/api`,
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로그인 시 저장한 토큰
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 서버에서 JWT 필터에서 이걸 사용
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
