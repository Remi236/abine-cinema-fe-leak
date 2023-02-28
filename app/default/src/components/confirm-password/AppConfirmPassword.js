import React, { useState, useRef } from 'react';
import '../confirm-password/AppConfirmPassword.css';
import { useLocation, useHistory } from 'react-router-dom';
import { PostOrPut } from '../../api/FuncApi';
import bg from '../../img/background.JPG';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';

function AppConfirmPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ criteriaMode: 'all' });
  const pass = useRef({});
  const [submit, setSubmit] = useState(false);
  pass.current = watch('pass', '');
  const [message, setMessage] = useState('Reset your password');
  const payload = useLocation().search;
  const history = useHistory();

  const onSubmit = async (data) => {
    setSubmit(true);
    const urlParams = new URLSearchParams(payload);
    const myParam = urlParams.get('payload');
    // console.log(payload,myParam);
    console.log(payload);
    console.log(myParam);
    console.log(data);
    const response = await PostOrPut('users/reset-pass', 'POST', {
      payload: myParam,
      pass: data.pass,
    });
    if ([400, 401, 404, 403, 500].includes(response.statusCode)) {
      setMessage('Reset fail!');
    } else {
      setMessage('Confirm password successfully, redirecting...');
      setTimeout(() => {
        history.push('/login');
      }, 5000);
    }
    setSubmit(false);
    return response;
  };
  return (
    <section style={{ backgroundImage: `url(${bg})` }}>
      <div className="confirm-password-container">
        <h1>{message}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div className="confirmpassword-control">
            <input
              name="pass"
              type="password"
              placeholder="Password"
              {...register('pass', {
                required: 'Password is required.',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="pass"
              render={({ messages }) => {
                console.log('messages', messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </div>
          {/* Confirm password */}
          <div className="confirmpassword-control">
            <input
              type="password"
              name="password_repeat"
              placeholder="Confirm password"
              {...register('password_repeat', {
                validate: (value) =>
                  value === pass.current || 'The passwords do not match',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password_repeat"
              render={({ messages }) => {
                console.log('messages', messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </div>
          {/* Reset password */}
          <div className="confirmpassword-control">
            {/* <input disabled={submit} type="submit" value="Register"/> */}
            <Button type="submit" disabled={submit}>
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AppConfirmPassword;
