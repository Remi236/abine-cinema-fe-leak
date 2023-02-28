import React, {useState, useEffect, useContext} from 'react';
import classNames from 'classnames';

import Loading from '../components/includes/Loading';
import TotalCinemas from '../components/pages/dashboard/TotalCinemas';
import TotalCinemaComplexs from '../components/pages/dashboard/TotalCinemaComplexs';
import TotalBookings from '../components/pages/dashboard/TotalBookings';
import TotalUsers from '../components/pages/dashboard/TotalUsers';
import TopsellChart from '../components/pages/dashboard/TopsellChart';
import LastedMovies from '../components/pages/dashboard/LastedMovies';
import LastedUsers from '../components/pages/dashboard/LastedUsers';
import LastedCinemaComplexs from '../components/pages/dashboard/LastedCinemaComplexs';
import Main from '../components/Main';

import {CollapseContext} from '../contexts/collapse.Context';
import {ThemeContext} from '../contexts/theme.Context';
import {CollapseMobileContext} from '../contexts/collapsMobile.Context';
import {validateToken} from '../helpers/handleToken';


const DashBoard_Page = () =>  {
  const [loading, setLoading] = useState(true);
  const {collapse, toggleCollapse }  = useContext(CollapseContext);
  // đây
  const {isLightTheme, toggleTheme } = useContext(ThemeContext);
  const { collapseMobile, toggleCollapseMobile } = useContext(CollapseMobileContext);

  const classTheme = classNames({
    'layout': true,
    'ltr-support': true,
    'theme-light' : isLightTheme,
    'theme-dark' : !isLightTheme,
    'layout--collapse': collapse,
  });

  useEffect(() => {

    document.title = `Abine Dashboard Management`;
    let timeout = setTimeout(() => setLoading(false), 500);
    validateToken();
    return () => clearTimeout(timeout);

  },[]);

  const loadingJSX = <Loading load={loading}/>;

  const pageJSX = (
    <div className="App">
      <div className={classTheme}>
        <Main collapse={collapse} toggleCollapse={toggleCollapse} isLightTheme={isLightTheme} toggleTheme={toggleTheme} collapseMobile={collapseMobile} toggleCollapseMobile={toggleCollapseMobile}/>
        <div className="container__wrap">
          <div className="dashboard container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="page-title">Dashboard</h3>
              </div>
            </div>
            <div className="row">
              <TotalCinemaComplexs/>
              <TotalCinemas/>
              <TotalBookings/>
              <TotalUsers/>
            </div>
            <div className="row">
              <TopsellChart />
            </div>
            <div className="row">
              <LastedCinemaComplexs/>
              <LastedUsers/>
              <LastedMovies/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? loadingJSX: pageJSX;
}


export default DashBoard_Page;
