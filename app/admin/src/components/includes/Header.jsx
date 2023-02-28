import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopBarProfile from './TopBarProfile';
import ToggleTheme from './ToggleTheme';

const Header = ({toggleCollapse, toggleCollapseMobile, toggleTheme, theme}) => {

  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <TopbarSidebarButton toggleCollapse={toggleCollapse} toggleCollapseMobile={toggleCollapseMobile} />
          <Link className="topbar__logo" to="/" />
        </div>
        <div className="topbar__right">
          <div className="topbar__right-over d-flex align-items-center">
            <ToggleTheme theme={theme} toggleTheme={toggleTheme}/>
          </div>
          <TopBarProfile />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  toggleCollapseMobile: PropTypes.func.isRequired,
}

export default Header;