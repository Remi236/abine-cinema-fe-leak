import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Form, Button, Card, Container } from 'react-bootstrap';
import { GetOrDelete } from '../../api/FuncApi';
import moment from 'moment';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/AppPage';
import qs from 'query-string';

// import LOGO_PLACEHOLDER from '../../img/abine_logo.png';

function AppFindByCinema() {
  const [cinemaList, setCinemaList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [pageScreening, setPageScreening] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const [cinemaComplexList, setCinemaComplexList] = useState([]);
  const cinemaComplexId = useRef(1);
  const cinemaId = useRef(1);

  const onChange = useCallback((e) => {
    cinemaComplexId.current = e.target.value;
    // console.log(e.target.value);
    // console.log(cinemaComplexId);
    const getCinemaList = async (cinemaComplexId) => {
      // console.log(cinemaComplexId);
      const params = {
        cinemaComplexId,
      };
      const response = await GetOrDelete('cinemas', 'GET', {}, params);
      const json = await response.json();
      return json;
    };
    getCinemaList(e.target.value).then((json) => {
      console.log(json);
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setCinemaList(json);
      }
    });
  }, []);

  useEffect(() => {
    const getCinemaComplexList = async () => {
      const response = await GetOrDelete('cinema-complexes', 'GET');
      const json = await response.json();
      return json;
    };
    getCinemaComplexList().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setCinemaComplexList(json);
        onChange({ target: { value: cinemaComplexId.current } });
      }
    });
  }, [onChange]);

  useEffect(() => {
    const getMovieList = async () => {
      const response = await GetOrDelete('movies', 'GET');
      const json = await response.json();
      return json;
    };
    getMovieList().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setMovieList(json);
      }
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.forms['find-by-cinema-form'];

    cinemaId.current = form['elements']['select-cinema-name'].value;

    const valuesObject = {
      cinemaComplexId: form['elements']['select-cinema-complex-name'].value,
      cinemaId: form['elements']['select-cinema-name'].value,
      startTime: form['elements']['select-date'].value,
    };
    console.log('VALUE: ', valuesObject);
    const findScreeningsByCinemaMovie = async (valuesObject) => {
      const response = await GetOrDelete('screenings', 'GET', {}, valuesObject);
      const json = await response.json();
      return json;
    };
    findScreeningsByCinemaMovie(valuesObject)
      .then((json) => {
        if ([401, 404, 403, 500].includes(json.statusCode)) {
          alert(json.message);
        } else {
          console.log(json);
          onPageChange({ selected: 0 });
          setIsFind(true);
        }
      })
      .catch(console.error);
  };
  const onPageChange = (page) => {
    console.log('PAGE: ', page);
    const form = document.forms['find-by-cinema-form'];
    const valuesObject = {
      cinemaComplexId: form['elements']['select-cinema-complex-name'].value,
      cinemaId: form['elements']['select-cinema-name'].value,
      startTime: form['elements']['select-date'].value,
      page: page.selected + 1,
    };
    console.log('valueObj:', valuesObject);
    const findScreeningsByCinemaMovie = async (valuesObject) => {
      const response = await GetOrDelete('screenings', 'GET', {}, valuesObject);
      const json = await response.json();
      return json;
    };
    findScreeningsByCinemaMovie(valuesObject)
      .then((json) => {
        console.log('JSON:', json);
        if ([401, 404, 403, 500].includes(json.statusCode)) {
          alert(json.message);
        } else {
          setPageScreening(json);
        }
      })
      .catch(console.error);
  };
  return (
    <div>
      <Header />
      <Container className="pt-4 text-white" style={{ height: 'auto' }}>
        <Form
          className="my-4 w-100"
          name="find-by-cinema-form"
          onSubmit={onSubmit}
        >
          <Row className="justify-content-center align-items-end">
            <Col xl={3}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Cinema Complex</Form.Label>
                <Form.Control
                  name="select-cinema-complex-name"
                  as="select"
                  custom
                  onChange={onChange}
                >
                  {cinemaComplexList.length ? (
                    cinemaComplexList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>We are updating ....</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Cinema</Form.Label>
                <Form.Control name="select-cinema-name" as="select" custom>
                  {cinemaList.length ? (
                    cinemaList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>We are updating ....</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  name="select-date"
                  type="date"
                  defaultValue={new Date().toLocaleDateString('en-CA')}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xl={3}>
              <Button
                className="w-100 mb-3"
                variant="outline-danger"
                type="submit"
              >
                Find
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="w-100">
          {pageScreening.length ? (
            pageScreening?.map((item, index) => {
              let itemMovieSelected = movieList.find(
                (itemMovie) => itemMovie.id === item.movieId,
              );
              return (
                <Col
                  key={index}
                  lg={4}
                  md={6}
                  sm={12}
                  className="mb-4 text-center"
                >
                  <Card
                    className="text-white"
                    style={{
                      borderRadius: '10px',
                      backgroundColor: '#1e1b26',
                    }}
                  >
                    <Card.Img
                      className="img-fluid"
                      style={{
                        padding: '20px 20px 0 20px',
                        minHeight: '320px',
                        maxHeight: '320px',
                        objectFit: 'contain',
                      }}
                      loading="lazy"
                      src={itemMovieSelected.poster}
                      alt={itemMovieSelected.name}
                    />
                    <Card.Body>
                      <Card.Title>{itemMovieSelected.name}</Card.Title>
                      <Card.Text className="text-center">
                        Start time:{' '}
                        {moment(item.startTime).format('DD/MM/YYYY hh:mm:ss')}
                        <br />
                        End time:{' '}
                        {moment(item.endTime).format('DD/MM/YYYY hh:mm:ss')}
                      </Card.Text>
                      <Link
                        className="btn btn-outline-danger w-100 text-center px-2 py-1 ml-2"
                        to={{
                          pathname: '/detail',
                          search: qs.stringify({
                            movieId: item.movieId,
                            cinemaId: cinemaId.current,
                            cinemaComplexId: cinemaComplexId.current,
                          }),
                        }}
                      >
                        Detail
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p className="text-warning">No movies available</p>
          )}
        </Row>
        <Row>
          <Pagination
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            breakLabel="..."
            pageCount={Math.ceil(pageScreening.length / 10)}
            pageRangeDisplayed={4}
            onPageChange={onPageChange}
            containerClassName={`${
              isFind ? '' : 'd-none'
            } w-100 pagination justify-content-center my-3`}
          />
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AppFindByCinema;
