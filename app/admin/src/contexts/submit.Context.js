import React, {useState, createContext} from 'react';

const SubmitContext = createContext();

const SubmitContextProvider = ({children}) => {

  const [isSubmit, setIsSubmit] = useState(false);

  // const setSubmit = () => {
  //   setisSubmit(isSubmit => !isSubmit);
  // }

  const SubmitContextData = {
    isSubmit,
    setIsSubmit,
  }

  return(
    <SubmitContext.Provider value={SubmitContextData}>
      {children}
    </SubmitContext.Provider>
  );
}

export {SubmitContext, SubmitContextProvider};