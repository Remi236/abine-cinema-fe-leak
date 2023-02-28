import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


const SidebarLink = ({
  title, 
  icon, 
  route, 
  type, 
  depth
}) => {

  var style = classNames({
    "sidebar__link" : true,
    "sidebar__link__subitem": depth > 0
  });

  return (
    <NavLink
      to={route}
      activeClassName="sidebar__link-active"
    >
      <li className={style}>
        {icon ? <span className={`sidebar__link-icon ${type} ${type}-${icon}`} /> : ''}
        <p className="sidebar__link-title">
          {title}
        </p>
      </li>
    </NavLink>
  );

} 

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  route: PropTypes.string,
  type: PropTypes.string,
  depth: PropTypes.number,
};

SidebarLink.defaultProps = {
  icon: '',
  route: '/',
  type: 'lnr',
  depth: 0,
};

export default SidebarLink;
