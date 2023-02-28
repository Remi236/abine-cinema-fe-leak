import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const SidebarCategory = ({ title, icon, children })  => {
  let { path } = useRouteMatch();
  // console.log(path.split("/"));
  // main path
  const initStateCollapse = path.split("/")[1] === title.toLowerCase();

  const [collapse , setCollapse] = useState(initStateCollapse);

  const toggle = () => setCollapse(collapse => !collapse);

  const categoryClass = classNames({
    'sidebar__category-wrap': true,
    'sidebar__category-wrap--open': collapse,
    'sidebar__link sidebar__category': true,
  });

  return (
    <div>
      <button className={categoryClass} type="button" onClick={() => toggle()}>
        {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
        <p className="sidebar__link-title">{title}</p>
        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>
            {children}
          </div>
        </ul>
      </Collapse>
    </div>
  );
}

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SidebarCategory.defaultProps = {
  icon: '',
};

export default SidebarCategory;
