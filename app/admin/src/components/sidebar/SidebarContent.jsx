import React from 'react';
import { Link } from 'react-router-dom'
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

const SidebarContent = () => (
  <div className="sidebar__content">
    <ul className="sidebar__block">
      <Link to="/"  className="logo_mobile d-md-none d-block"/>
      <SidebarLink title="Dashboard" icon="home" route="/" />
      <SidebarCategory title="Management" icon="layers">
        <SidebarLink depth={1} title="Cinema Complexs" icon="library-movie" type="mdi" route="/management/cinemaComplexs" />
        <SidebarLink depth={1} title="Cinemas" icon="movie-roll" type="mdi" route="/management/cinemas" />
        <SidebarLink depth={1} title="Movies" icon="movie-outline" type="mdi" route="/management/movies" />
        <SidebarLink depth={1} title="Screenings" icon="monitor-speaker" type="mdi" route="/management/screenings" />
      </SidebarCategory>
      <SidebarCategory title="Statistic" icon="chart-bars">
        <SidebarLink depth={1} title="CinemaComplexs" icon="file-document-box-multiple-outline" type="mdi" route="/statistic/cinemaComplexs" />
        <SidebarLink depth={1} title="Movies" icon="file-chart-outline" type="mdi" route="/statistic/movies" />
      </SidebarCategory>
    </ul>
  </div>
);

export default SidebarContent;
