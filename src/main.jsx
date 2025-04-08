import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css' // 없어도 됨
/*  */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <App />
    
  </StrictMode>
)