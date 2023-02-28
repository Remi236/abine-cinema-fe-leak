import React, { useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Alert,Button } from 'reactstrap';
// import { Link } from 'react-router-dom';


const LoginCard = ({isSubmit, onSubmit}) => {

  const [showPassWord, setShowPassWord] = useState(false);
  const [isError] = useState(false);
  const [icon, setIcon] = useState("outline");

  const errorMessages = useRef([]);

  function handleShowPass() {
    let newShowPass = !showPassWord;
    let newIcon = showPassWord ? "outline" : "off-outline";
    setIcon(newIcon);
    setShowPassWord(newShowPass);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var email = e.target.querySelector("#email").value;   
    var pass = e.target.querySelector("#password").value;
    const values = {
      email,
      pass
    };
    onSubmit(values);
  }

  return (
    <form action="/admin/login" className="form login-form" onSubmit={(e) =>handleSubmit(e)}>
      {
        errorMessages.length && errorMessages.map(item => (
          <Alert
            color="danger"
            isOpen={!!isError}
          >
          {item}
          </Alert>
        ))
      }
      <div className="form__form-group">
        <label htmlFor="email" className="form__form-group-label">Email</label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <span className={`sidebar__link-icon mdi mdi-email-outline`} /> 
          </div>
          <input type="text" name="email" id="email"/>
        </div>
      </div>
      <div className="form__form-group">
        <label htmlFor="password" className="form__form-group-label">Password</label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
          <span className={`sidebar__link-icon mdi mdi-key-variant`} /> 
          </div>
         
          <input type={showPassWord ? 'text' : 'password'} name="password"  placeholder="Password" id="password"/>
          <button
            type="button"
            className={`form__form-group-button${showPassWord ? ' active' : ''}`}
            onClick={() => handleShowPass()}
          >
            <span className={`sidebar__link-icon mdi mdi-eye-${icon}`} /> 
          </button>
        </div>
      </div>
      <div className="account__btns">
        <Button className="account__btn" submit="true" color="primary" disabled={isSubmit}>Sign In</Button>
      </div>
    </form>
  );
};

LoginCard.propTypes = {
  // changeIsOpenModalFireBase: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LoginCard.defaultProps = {
  errorMessage: '',
}

export default LoginCard;
