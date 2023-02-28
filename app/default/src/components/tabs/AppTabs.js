import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import '../tabs/AppTabs.css';
import MovieLatest from '../movie/AppMovieLatest';
import MovieMostView from '../movie/AppMovieMostView';

function AppTabs() {
  return (
    <Container className="py-4" style={{ backgroundColor: '#090909' }} fluid>
      <Tabs
        className="movie-tabs"
        defaultActiveKey="movie-latest"
        id="uncontrolled-tab-example"
      >
        <Tab className="tab-control" eventKey="movie-latest" title="LATEST">
          <h1 className="movie-text">LATEST</h1>
          <MovieLatest />
        </Tab>
        <Tab
          className="tab-control"
          eventKey="movie-mostview"
          title="MOST VIEWED"
        >
          <h1 className="movie-text">MOST VIEWED</h1>
          <MovieMostView />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AppTabs;
