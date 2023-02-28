import React, { useRef, useState, useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { Accordion, Button } from 'react-bootstrap';
import '../profile/AppProfile.css';
import bg2 from '../../img/background2.jpg';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import { GetOrDelete, PostOrPut } from '../../api/FuncApi';
import Alert from '../alertmodal/AppAlertModal';

function AppProfile() {
  const [isAlert, setIsAlert] = useState(false);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState('');
  const [color, setColor] = useState('');
  const onCloseAlert = () => {
    setIsAlert(false);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ criteriaMode: 'all' });
  const pass = useRef({});
  pass.current = watch('pass', '');
  const [submit, setSubmit] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  useEffect(() => {
    const GetInfo = async () => {
      const access_token = sessionStorage.getItem('access_token');
      const response = await GetOrDelete('users/profile', 'GET', {
        Authorization: `Bearer ${access_token}`,
      });
      const json = await response.json();
      return json;
    };
    GetInfo()
      .then((json) => {
        if ([401, 404, 403, 500].includes(json.statusCode)) {
          // alert(json.message);
          setIsAlert(true);
          setContent(json.message);
          setHeader('Oh snap! You got an error!');
          setColor('danger');
        } else {
          reset(json);
        }
      })
      .catch(console.error);
  }, [reset]);

  const onSubmit = (data) => {
    console.log('Data from Submit:', data);
    const updateProfile = async (data) => {
      const access_token = sessionStorage.getItem('access_token');
      const { password_repeat, email, createdAt, updatedAt, ...myData } = data;
      // myData=data.pass?{...myData}:{pass,...myData};
      if (myData.pass === '') delete myData.pass;
      const response = await PostOrPut('users/profile', 'PUT', myData, {
        Authorization: `Bearer ${access_token}`,
      });
      const json = await response.json();
      console.log('JSON', json);
      console.log('DATA', myData);
      console.log('ACESSTOKEN:', access_token);
      return json;
    };
    console.log(updateProfile(data));
    updateProfile(data)
      .then((json) => {
        console.log(json);
        setSubmit(true);
        if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
          // alert(json.message);
          setIsAlert(true);
          setContent(json.message);
          setHeader('Oh snap! You got an error!');
          setColor('danger');
        } else {
          setIsAlert(true);
          setContent('Change information successfully!');
          setHeader('Hey, nice to see you!');
          setColor('success');
          setSubmit(false);
        }
      })
      .catch(console.error);
  };
  return (
    <div>
      <Header />
      <section style={{ backgroundImage: `url(${bg2})` }}>
        <Alert
          content={content}
          heading={header}
          color={color}
          isShow={isAlert}
          onClose={onCloseAlert}
        />
        <div className="profile-container">
          <h2>Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="profile-control">
              <input
                type="email"
                readOnly
                placeholder="Email"
                ref={register}
                {...register('email')}
              />
            </div>
            {/* Name */}
            <div className="profile-control">
              <input
                type="text"
                ref={register}
                placeholder="Full name"
                {...register('name', {
                  required: 'Full name is required.',
                  pattern: {
                    value:
                      /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/,
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
            <div className="profile-control">
              <input
                ref={register}
                placeholder="Phone number"
                {...register('phone', {
                  required: 'Phone number is required.',
                  pattern: {
                    value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
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
            {/* Change password */}
            <div className="profile-control">
              <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Change password ?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div>
                    {/* Password */}
                    <div className="profile-control">
                      <input
                        name="pass"
                        type="password"
                        placeholder="Password"
                        {...register('pass')}
                        onChange={(e) => {
                          setCurrentPass(e.target.value);
                        }}
                      />
                    </div>
                    {/* Confirm password */}
                    <div className="profile-control">
                      <input
                        type="password"
                        name="password_repeat"
                        placeholder="Confirm password"
                        {...register('password_repeat', {
                          validate: (value) => {
                            console.log(currentPass, 'VALUE', value);
                            if (currentPass) {
                              return value === currentPass
                                ? null
                                : "The password doesn't match";
                            }
                            return null;
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="password_repeat"
                        render={({ messages }) => {
                          console.log('messages', messages);
                          return messages
                            ? Object.entries(messages).map(
                                ([type, message]) => (
                                  <p key={type}>{message}</p>
                                ),
                              )
                            : null;
                        }}
                      />
                    </div>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </div>
            {/* Save */}
            <div className="profile-control">
              <Button type="submit" disabled={submit}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AppProfile;
