import React, {useState, useEffect, useContext} from 'react';
import classNames from 'classnames';

import Loading from '../../components/includes/Loading';
import Main from '../../components/Main';
import MoiveTable from '../../components/pages/movie/MovieTable';

import {CollapseContext} from '../../contexts/collapse.Context';
import {ThemeContext} from '../../contexts/theme.Context';
import { SubmitContextProvider } from '../../contexts/submit.Context';
import {CollapseMobileContext} from '../../contexts/collapsMobile.Context';
import {validateToken} from '../../helpers/handleToken';

const Movie_Page = () =>  {
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
    document.title = `Movies Managerment`;
    let timeout = setTimeout(() => setLoading(false), 500);
    validateToken();
    return () => clearTimeout(timeout);

  },[]);

  const loadingJSX = <Loading load={loading}/>;

  const pageJSX = (
    <div className="App">
      <div className={classTheme}>
        <Main collapse={collapse} toggleCollapse={toggleCollapse} isLightTheme={isLightTheme} toggleTheme={toggleTheme} collapseMobile={collapseMobile} toggleCollapseMobile={toggleCollapseMobile} />
        <div className="container__wrap">
          <div className="movie_page container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="page-title">Movies Managerment</h3>
              </div>
            </div>
            <div className="row">
              <SubmitContextProvider>
                <MoiveTable />
              </SubmitContextProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? loadingJSX: pageJSX;
}


export default Movie_Page;
