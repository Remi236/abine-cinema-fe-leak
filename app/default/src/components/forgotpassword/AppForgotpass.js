import React, { useState } from 'react';
import '../forgotpassword/AppForgotpass.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import bg from '../../img/background.JPG';
import { Link } from 'react-router-dom';
import { PostOrPut } from '../../api/FuncApi';
import Alert from '../alertmodal/AppAlertModal';

function AppForgotpass() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: 'all' });
  const [submit, setSubmit] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState('');
  const [color, setColor] = useState('');
  const onCloseAlert = () => {
    setIsAlert(false);
  };
  const onSubmit = async (data) => {
    //alert('Check your email to reset password!');
    setIsAlert(true);
    setContent('Check your email to reset password!');
    setHeader('Hey, nice to see you!');
    setColor('success');
    setSubmit(true);
    console.log(data);
    const response = await PostOrPut('users/forgot-pass', 'POST', data);
    const json = await response.json();
    console.log(json);
    setSubmit(false);
  };
  return (
    <section style={{ backgroundImage: `url(${bg})` }}>
      <Alert
        content={content}
        heading={header}
        color={color}
        isShow={isAlert}
        onClose={onCloseAlert}
      />
      <div className="forgot-form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="forgotpass-control">
            <input
              placeholder="Email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'This input is not valid!',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
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
          {/* Send */}
          <div className="forgotpass-control">
            <input type="submit" disabled={submit} value="Send my email" />
          </div>
          <div className="forgotpass-control my-2">
            <span>Already confirm ? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AppForgotpass;
