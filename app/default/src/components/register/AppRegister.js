import React, { useRef, useState } from 'react';
import '../register/AppRegister.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { PostOrPut } from '../../api/FuncApi';
import bg from '../../img/background.JPG';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from '../alertmodal/AppAlertModal';

function AppRegister() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
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
    //alert('Check your email to verify');
    setIsAlert(true);
    setContent('Check your email to verify');
    setHeader('Hey, nice to meet you');
    setColor('success');
    setSubmit(true);
    const { password_repeat, ...myData } = data;
    console.log(data);
    const response = await PostOrPut('users/reg', 'POST', myData);
    const json = await response.json();
    console.log(json);
    // setTimeout(() => {
    setSubmit(false);
    // }, 3000);
  };
  const pass = useRef({});
  pass.current = watch('pass', '');
  return (
    <section style={{ backgroundImage: `url(${bg})` }}>
      <Alert
        content={content}
        heading={header}
        color={color}
        isShow={isAlert}
        onClose={onCloseAlert}
      />
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="control">
            <input
              placeholder="Full name"
              {...register('name', {
                required: 'Full name is required.',
                pattern: {
                  //   value:
                  //     /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/,
                  value:
                    /^[a-zA-Z_ÀÁÂÃÈÉÊỀẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêềếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,}(?: [a-zA-ZÀÁÂÃÈÉÊỀẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêềếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+){0,4}$/,
                  message: 'This input is not valid!',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
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
          {/* Phone number */}
          <div className="control">
            <input
              placeholder="Phone number"
              {...register('phone', {
                required: 'Phone number is required.',
                pattern: {
                  value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  //   value: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
                  message: 'This input is not valid!',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
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
          {/* Email */}
          <div className="control">
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:-\s@"]+(\.[^<>()[\]\\.,;:-\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          {/* Password */}
          <div className="control">
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
          <div className="control">
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
          {/* Register */}
          <div className="control">
            {/* <input disabled={submit} type="submit" value="Register"/> */}
            <Button type="submit" disabled={submit}>
              Register
            </Button>
          </div>
          <div className="control my-2">
            <span>Already have account ? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AppRegister;
