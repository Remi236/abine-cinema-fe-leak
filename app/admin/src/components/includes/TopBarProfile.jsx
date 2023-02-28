import React, {useState, useEffect} from 'react';
import { Collapse } from 'reactstrap';
// import PropTypes from 'prop-types';
import TopBarMenuLink from './TopBarMenuLink';
import Avatar from "../../imgs/profile.jpg";
import {getData, ERROR_CODES} from '../../api';


const TopBarProfile = () => {

  const [collapse, setCollapse] = useState(false);
  // console.log(user);
  const [user, setUser] = useState({});

  useEffect(() => {
    const initState = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData('/admins/profile',{
        Authorization: `Bearer ${access_token}`,
      });
      // console.log(currentUser.current);
      return response;
      // console.log(newUser);
    }
    initState().then(response => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
      }
      else {
        setUser(response);
      }
    }).catch(console.error);
  },[]);

  const toggle = () => {
    setCollapse(collapse => !collapse);
  };

  const logout = () => {
    if (sessionStorage.getItem("access_token")) {
      sessionStorage.removeItem("access_token");
    }
  }

  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={() => toggle()}>
        <img
          className="topbar__avatar-img"
          src={ user.avatar ? user.avatar : Avatar }
          alt="avatar"
        />
        <p className="topbar__avatar-name">
          { user.name ? user.name : "Nguyen Thanh Xuan" }
        </p>
        <svg className="mdi-icon topbar__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
        </svg>
      </button>
      {collapse && <button className="topbar__back" type="button" onClick={() => toggle()} />}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopBarMenuLink
            title="Log Out"
            icon="exit"
            path="/login"
            onClick={logout}
          />
        </div>
      </Collapse>
    </div>
  );
}

// TopBarProfile.propTypes = {
//   user: PropTypes.object,
// }

export default TopBarProfile;
