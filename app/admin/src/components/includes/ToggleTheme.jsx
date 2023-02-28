import React from 'react';
import PropTypes from 'prop-types';
// import CollapseContext from '../../contexts/collapse.Context';

// TopbarSidebarButton.PropTypes = {
//   changeSidebarVisibility: PropTypes.func.isRequired,
// }

 const ToggleTheme = ({theme, toggleTheme}) => {

  const content = theme ? "Light Theme" : "Dark Theme";
  function handleToggleTheme() {
    toggleTheme();
  }

  return (
    <label className="toggle-btn customizer__toggle" htmlFor="theme_toggle">
      <input
        className="toggle-btn__input"
        type="checkbox"
        name="theme_toggle"
        id="theme_toggle"
        checked={!theme}
        onChange={() => handleToggleTheme()}
      />
      <span className="toggle-btn__input-label" />
      <span>{ content }</span>
    </label>
  );
}

ToggleTheme.propTypes = {
  theme: PropTypes.bool,
  toggleTheme: PropTypes.func.isRequired
}

export default ToggleTheme;