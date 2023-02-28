import React, {useState, useEffect, useContext} from 'react';
import classNames from 'classnames';

import Loading from '../../components/includes/Loading';
import Main from '../../components/Main';
import CinemaComplexAnalist from '../../components/pages/cinemaComplex/CinemaComplexAnalist';

import {CollapseContext} from '../../contexts/collapse.Context';
import {ThemeContext} from '../../contexts/theme.Context';
import {CollapseMobileContext} from '../../contexts/collapsMobile.Context';
import {validateToken} from '../../helpers/handleToken';

const Cinema_Complexs_Analist_Page = () =>  {

  const [loading, setLoading] = useState(true);
  const {collapse, toggleCollapse }  = useContext(CollapseContext);
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

    document.title = `Cinema Complexs Analist`;
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
          <div className="cinema_complex_analist_page container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="page-title">Cinema Complexs Analist</h3>
              </div>
            </div>
            <div className="row">
              <CinemaComplexAnalist />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? loadingJSX: pageJSX;
}


export default Cinema_Complexs_Analist_Page;
