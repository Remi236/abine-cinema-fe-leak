// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {CollapseContextProvider} from '../contexts/collapse.Context';
import {ThemeContextProvider} from '../contexts/theme.Context';
import {CollapseMobileContextProvider} from '../contexts/collapsMobile.Context';

import {
  DashBoard_Page,
  Login_Page,
  Cinema_Complex_Page,
  Cinemas_Page,
  Screening_Page,
  Movie_Page,
  Movies_Analist_Page,
  Cinema_Complexs_Analist_Page,
  Not_Found_Page,
  Forbidden_Page,
  Error_Server_Page,
  Test_Page,
} from "../pages";

const Routers = () => (
  <Router>
    <ThemeContextProvider>
      <CollapseContextProvider>
        <CollapseMobileContextProvider>
          <Switch>
            <Route path="/management/cinemaComplexs" component={Cinema_Complex_Page} />
            <Route path="/management/cinemas" component={Cinemas_Page} />
            <Route path="/management/screenings" component={Screening_Page} />
            <Route path="/management/movies" component={Movie_Page} />
            <Route path="/statistic/cinemaComplexs" component={Cinema_Complexs_Analist_Page} />
            <Route path="/statistic/movies" component={Movies_Analist_Page} />
            <Route path="/login" component={Login_Page} />
            <Route exact path="/" component={DashBoard_Page} />
            <Route path="/test" component={Test_Page} />
            <Route path="/500" component={Error_Server_Page} />
            <Route path="/403" component={Forbidden_Page} />
            <Route component={Not_Found_Page}/>
          </Switch>
          </CollapseMobileContextProvider>
        </CollapseContextProvider>
      </ThemeContextProvider>
  </Router>
);

export default Routers;