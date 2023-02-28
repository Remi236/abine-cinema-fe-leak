import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';

const Sidebar = ({collapse, collapseMobile}) => {
  const sidebarClass = classNames({
    sidebar: true,
    'sidebar--collapse': collapse,
    'sidebar--show': collapseMobile,
  });

  const sidebarWrapperClass = classNames({
    'sidebar__wrapper': true,
    'sidebar__wrapper--mobile': collapseMobile,
    'sidebar__wrapper--desktop': !collapseMobile,
  });

  return (
    <div className={sidebarClass}>
      <div className={sidebarWrapperClass}>
        <SidebarContent />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collapse: PropTypes.bool,
  collapseMobile: PropTypes.bool,
};

export default Sidebar;
