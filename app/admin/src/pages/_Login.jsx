import React, {useState, useEffect} from 'react';
import { Alert } from 'reactstrap';

import LoginForm from '../components/pages/login/LoginForm';
import {postData, ERROR_CODES} from '../api';
import Logo from '../imgs/abine_logo.png';
import {redirectToken} from '../helpers/handleToken';

const Login_Page = () => {
  
  const [messageErrors, setMessageErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    document.title = "Login";
  },[]);

  async function onSubmit(values) {
    // fetch
    const res = await postData("/admin/login", values);
    setIsSubmit(true);

    if(ERROR_CODES.includes(res.statusCode)) {
      setMessageErrors(res.message);
      setIsSubmit(false);
    }

    else if(res.access_token) {
      redirectToken(res.access_token);
    }
  }
  return (
    <div className="page theme-light ltr-support">
      <div className="account ">
        <div className="account account--not-photo">
          <div className="account__wrapper">
            <div className="account__card">
              <div className="account__head border-0">
                <img src={Logo} alt="Abine App" className="img-fluid"/>
              </div>
              {
                messageErrors && (
                  <Alert className="p-2 text-white rounded-3" color="danger">
                    {messageErrors}
                  </Alert>
                )
              }
              <LoginForm onSubmit={onSubmit} isSubmit={isSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 


export default Login_Page;
