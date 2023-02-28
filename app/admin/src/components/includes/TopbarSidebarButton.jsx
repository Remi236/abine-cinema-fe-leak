import React from 'react';
import PropTypes from 'prop-types';

import hambuger_icon from '../../imgs/sidebar_toggle_icon.svg';

const TopbarSidebarButton = ({toggleCollapse, toggleCollapseMobile}) => {

  const handleToggleCollapse = () => {
    toggleCollapse();
  }
  const handleToggleMobileCollapse = () => {
    toggleCollapseMobile();
  }

  return (
    <div>
      <button className="topbar__button topbar__button--desktop" type="button" onClick={() => handleToggleCollapse()}>
        <img src={hambuger_icon} alt="" className="topbar__button-icon" />
      </button>
      <button className="topbar__button topbar__button--mobile sidebar__back" type="button" onClick={() => handleToggleMobileCollapse()}>
          <img src={hambuger_icon} alt="" className="topbar__button-icon" />
        </button>
    </div>
  );
}

TopbarSidebarButton.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  toggleCollapseMobile: PropTypes.func.isRequired,
}

export default TopbarSidebarButton;