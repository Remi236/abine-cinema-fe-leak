import React, {useState, createContext} from 'react';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

  const [isLightTheme, setisLightTheme] = useState(true);

  const toggleTheme = () => {
    setisLightTheme(isLightTheme => !isLightTheme);
  }

  const ThemeContextData = {
    isLightTheme,
    toggleTheme,
  }

  return(
    <ThemeContext.Provider value={ThemeContextData}>
      {children}
    </ThemeContext.Provider>
  );
}

export {ThemeContext, ThemeContextProvider};