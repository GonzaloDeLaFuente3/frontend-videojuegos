import React from 'react';
import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext'; // Importa el contexto de tema

function App() {
  const { isDarkMode } = useContext(ThemeContext); // Obtenemos el estado del tema oscuro
  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-700 ' : 'bg-white '} `}>
        <ToastContainer />
        <AppRouter />
      </div>
    </>
  )
}

export default App
