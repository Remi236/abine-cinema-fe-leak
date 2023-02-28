import React from 'react';
import PropTypes from 'prop-types';

import Header from './includes/Header';
import Sidebar from './sidebar/Sidebar';

const Main = ({collapse, toggleCollapse, collapseMobile, toggleCollapseMobile, isLightTheme, toggleTheme}) => (
  <div className="partials">
    <Header toggleCollapse={toggleCollapse} toggleCollapseMobile={toggleCollapseMobile} toggleTheme={toggleTheme} theme={isLightTheme}/>
    <Sidebar collapse={collapse} collapseMobile={collapseMobile}/>
  </div>
);
  
Main.propTypes = {
  collapse: PropTypes.bool,
  collapseMobile: PropTypes.bool,
  isLightTheme: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  toggleCollapseMobile: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Main;
