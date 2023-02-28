import React, { useState, useEffect } from 'react';
import '../confirm-email/AppConfirmEmail.css';
import { useLocation, useHistory } from 'react-router-dom';
import { GetOrDelete } from '../../api/FuncApi';
import bg from '../../img/background.JPG';

function AppConfirmEmail() {
  const [message, setMessage] = useState('Verifying');
  const search = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    const CheckPayload = async (payload) => {
      const urlParams = new URLSearchParams(payload);
      const myParam = urlParams.get('payload');
      // console.log(payload,myParam);
      const response = await GetOrDelete(
        'users/confirm-email',
        'GET',
        {},
        { payload: myParam },
      );
      const json = await response.json();
      return json;
    };
    CheckPayload(search)
      .then((data) => {
        if ([401, 404, 403, 500].includes(data.statusCode)) {
          setMessage('Verify fail!');
        } else {
          setMessage('Verify successfully, redirecting...');
        }
        setTimeout(() => {
          history.push('/login');
        }, 5000);
      })
      .catch(console.error);
  }, [search, history]);
  return (
    <section style={{ backgroundImage: `url(${bg})` }}>
      <div className="confirm-email-container">
        <h1>{message}</h1>
      </div>
    </section>
  );
}

export default AppConfirmEmail;
