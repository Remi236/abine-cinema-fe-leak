import React, {useState, createContext} from 'react';


const CollapseContext = createContext();

const CollapseContextProvider = ({children}) => {

  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse( collapse => !collapse );
  }

  const CollapseContextData = {
    collapse,
    toggleCollapse,
  }

  return(
    <CollapseContext.Provider value={CollapseContextData}>
      {children}
    </CollapseContext.Provider>
  );
}

export {CollapseContext, CollapseContextProvider};