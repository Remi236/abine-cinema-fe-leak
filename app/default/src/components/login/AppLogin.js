import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import '../login/AppLogin.css';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { PostOrPut, GetOrDelete } from '../../api/FuncApi';
import bg from '../../img/background.JPG';
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import Alert from '../alertmodal/AppAlertModal';
import { useHistory } from 'react-router-dom';

function AppLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: 'all' });
  const [isAlert, setIsAlert] = useState(false);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState('');
  const [color, setColor] = useState('');
  const history = useHistory();
  const onCloseAlert = () => {
    setIsAlert(false);
  };
  const onSubmit = async (data) => {
    console.log(data);
    const response = await PostOrPut('user/login', 'POST', data);
    const json = await response.json();
    console.log('j', json);
    console.log('GACON' + response);
    console.log(json.statusCode);
    if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
      // alert(json.message);
      setIsAlert(true);
      setContent(json.message);
      setHeader('Oh snap! You got an error!');
      setColor('danger');
    } else {
      const { access_token } = json;
      sessionStorage.setItem('access_token', access_token);
      history.push('/');
    }
  };
  // const componentClicked = () => {};
  const responseFacebook = async (response) => {
    const { accessToken } = response;
    console.log(accessToken);
    const res = await GetOrDelete(
      'facebook',
      'GET',
      {},
      {
        access_token: accessToken,
      },
    );
    const json = await res.json();
    console.log('j', json);
    if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
      // alert(json.message);
      setIsAlert(true);
      setContent(json.message);
      setHeader('Oh snap! You got an error!');
      setColor('danger');
    } else {
      const { access_token } = json;
      sessionStorage.setItem('access_token', access_token);
      history.push('/');
    }
  };
  const onSuccess = async (obj) => {
    console.log('s', obj);
    console.log('tokenId', obj.tokenId);
    const res = await GetOrDelete(
      'google',
      'GET',
      {},
      {
        token: obj.tokenId,
      },
    );
    const json = await res.json();
    console.log('j', json);

    if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
      // alert(json.message);
      setIsAlert(true);
      setContent(json.message);
      setHeader('Oh snap! You got an error!');
      setColor('danger');
    } else {
      const { access_token } = json;
      sessionStorage.setItem('access_token', access_token);
      history.push('/');
    }
  };
  const componentClicked = () => {};

  const onFailure = (res) => {
    console.log('f', res);
    setIsAlert(true);
    setContent(res.details || res.error);
    setHeader('Oh snap! You got an error!');
    setColor('danger');
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
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="login-control">
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
          {/* Password */}
          <div className="login-control">
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
          {/* Forget password */}
          <div className="login-control">
            <Link to="/forgot-pass">Forget password?</Link>
          </div>
          {/* Login */}
          <div className="login-control">
            <input type="submit" value="Login" />
          </div>
          {/* Login with FB & GG */}
          <div className="login-with">Or login with</div>
          {/* Link to FB && GG */}
          <div className="link">
            <FacebookLogin
              appId="198001725371328"
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
              render={(renderProps) => (
                <div className="facebook" onClick={renderProps.onClick}>
                  <FaFacebookF
                    style={{
                      margin: '5px 5px 10px 5px',
                      width: '12px',
                      height: '20px',
                    }}
                  />
                  <span>Facebook</span>
                </div>
              )}
            />
            <GoogleLogin
              clientId={
                '765645902045-2hqo815a2d8brlb2qrq58j249isgmk09.apps.googleusercontent.com'
              }
              onSuccess={onSuccess}
              onFailure={onFailure}
              render={(renderProps) => (
                <div className="google" onClick={renderProps.onClick}>
                  <FaGoogle
                    style={{
                      margin: '5px 5px 10px 5px',
                      width: '18px',
                      height: '20px',
                    }}
                  />
                  <span>Google</span>
                </div>
              )}
            />
          </div>
          {/* Register */}
          <div className="signup">
            Don't have account ?<Link to="/reg"> Register now!</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AppLogin;
