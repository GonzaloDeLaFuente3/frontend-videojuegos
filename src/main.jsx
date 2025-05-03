import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'// Proveedor de contexto para el tema

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Proveedor de contexto para el tema */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
