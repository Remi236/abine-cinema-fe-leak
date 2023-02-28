import React, {useState, createContext} from 'react';


const CollapseMobileContext = createContext();

const CollapseMobileContextProvider = ({children}) => {

  const [collapseMobile, setCollapseMobile] = useState(false);

  const toggleCollapseMobile = () => {
    setCollapseMobile( collapseMobile => !collapseMobile );
  }

  const CollapseMobileContextData = {
    collapseMobile,
    toggleCollapseMobile,
  }

  return(
    <CollapseMobileContext.Provider value={CollapseMobileContextData}>
      {children}
    </CollapseMobileContext.Provider>
  );
}

export {CollapseMobileContext, CollapseMobileContextProvider};