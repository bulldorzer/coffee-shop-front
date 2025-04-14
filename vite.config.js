import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {            // '/api' 요청을 프론트 서버가 가로채지 않게 백엔드로 넘기기 위한 프론트 설정 
    '/api': {
      target: 'http://localhost:8081', // Spring Boot 서버 주소
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
})
