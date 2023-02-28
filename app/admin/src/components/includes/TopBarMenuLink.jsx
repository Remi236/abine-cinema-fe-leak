import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopBarMenuLink = ({
  title, icon, path, type, onClick
}) => {

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
    window.location.href = path;
  }

  return (
    <Link className="topbar__link" to={path} onClick={(e) => handleClick(e)}>
      <span className={`topbar__link-icon ${type} ${type}-${icon}`} />
      <p className="topbar__link-title">{title}</p>
    </Link>
  );
}

TopBarMenuLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

TopBarMenuLink.defaultProps = {
  icon: '',
  route: '/',
  type: 'lnr',
};

export default TopBarMenuLink;