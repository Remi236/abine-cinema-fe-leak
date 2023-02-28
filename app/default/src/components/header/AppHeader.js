import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../header/AppHeader.css';
import { GetOrDelete } from '../../api/FuncApi';
import { FaRegUser } from 'react-icons/fa';
import { IoLogOutOutline, IoListOutline } from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';

function AppHeader() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [message, setMessage] = useState('Login');
  const [path, setPath] = useState('/login');
  const history = useHistory();
  function CheckLogout(e) {
    e.preventDefault();
    console.log(path);
    console.log(typeof path);
    console.log(sessionStorage.getItem('access_token'));
    console.log(
      'Result:',
      path === '/logout' && sessionStorage.getItem('access_token') !== '',
    );
    if (path === '/logout' && sessionStorage.getItem('access_token') !== '') {
      sessionStorage.removeItem('access_token');
      history.push('/login');
    } else {
      history.push(path);
    }
  }
  useEffect(() => {
    const access_token = sessionStorage.getItem('access_token');
    const CheckLogin = async () => {
      const response = await GetOrDelete('users/profile', 'GET', {
        Authorization: `Bearer ${access_token}`,
      });
      try {
        const json = await response.json();
        // console.log('JSON', json);
        // console.log('RES', response);
        return { response, json };
      } catch (message) {
        console.log(message);
      }
    };
    if (access_token) {
      CheckLogin()
        .then(({ response, json }) => {
          if ([401, 404, 403, 500].includes(json.statusCode)) {
            setMessage('Login fail!');
          } else {
            setisLoggedIn(true);
            setMessage(json.name);
            setPath('/logout');
          }
        })
        .catch(console.error);
    }
  }, [path, message]);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: 'rgba(0,0,0,.9)' }}
    >
      <Navbar.Brand href="/">
        <img
          alt="Logo"
          src="/logo.svg"
          width="45"
          height="45"
          className="d-inline-block align-top"
        />{' '}
        Abine
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/cinema">Cinema</Link>
          <Link to="/gift-card">Gift card</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/about-us">About us</Link>
        </Nav>
        {isLoggedIn ? (
          <Nav>
            <NavDropdown title={message} id="collasible-nav-dropdown">
              <Link title="Profile" to="/profile">
                <FaRegUser />
              </Link>
              <Link title="Booking History" to="/bookinghistory">
                <IoListOutline />
              </Link>
              <Link title="Logout" to="/logout" onClick={CheckLogout}>
                <IoLogOutOutline />
              </Link>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Link to="/login">Login</Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppHeader;
