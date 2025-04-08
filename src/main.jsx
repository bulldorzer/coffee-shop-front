import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css' // 없어도 됨
/* 전체화면이 적용되는 파일 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <App />
    
  </StrictMode>
)