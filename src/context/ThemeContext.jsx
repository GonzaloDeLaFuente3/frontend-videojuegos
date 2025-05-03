/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

//creo el contexto 
export const ThemeContext = createContext();

//defino componente proveedor que envuelve toda la aplicacion, permite que se acceda al contexto
export const ThemeProvider = ({ children }) => {//children prop especial que representa los componentes hijos dentro de Provider
    
    //obtengo el estado del localstorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;// convierto en booleano, sino existe false
    });

    //para guardar la preferencia del tema
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);// cada vez que isdarkmode cambie , para que se mantenga actualizada 

    //alternar el tema
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);//prevMode es el estado anterior, lo invierto
    };

    //Se proporciona isDarkMode y toggleTheme como valores accesibles para todos los componentes dentro del contexto.
    return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {/* permite que los componentes hijos dentro del proveedor tengan acceso al contexto. */}
        {children} 
    </ThemeContext.Provider>
    );
};
