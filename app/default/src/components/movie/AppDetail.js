import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import { useLocation, useHistory } from 'react-router-dom';
import { GetOrDelete } from '../../api/FuncApi';
import moment from 'moment';
import bg2 from '../../img/background2.jpg';
import '../movie/AppDetail.css';
// import { Link } from 'react-router-dom';
import qs from 'query-string';

function AppDetail() {
  const location = useLocation();
  const queryParam = qs.parse(location.search);
  const { movieId, cinemaId, cinemaComplexId } = queryParam;
  // const valueCinemaId = cinemaId || 1;
  // const valueCinemaComplexId = cinemaComplexId || 1;

  const [movieDetail, setMovieDetail] = useState([]);
  // const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cinemaComplexList, setCinemaComplexList] = useState([]);
  const [cinemaList, setCinemaList] = useState([]);
  const [screeningList, setScreeningList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getCinemaComplexList = async () => {
      const response = await GetOrDelete(
        'cinema-complexes',
        'GET',
        {},
        { movieId },
      );
      const json = await response.json();
      return json;
    };
    getCinemaComplexList().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setCinemaComplexList(json);
      }
    });
  }, [movieId]);

  useEffect(() => {
    const getCinemaList = async () => {
      const params = cinemaComplexId
        ? { cinemaComplexId, movieId }
        : { movieId };
      const response = await GetOrDelete('cinemas', 'GET', {}, params);
      const json = await response.json();
      return json;
    };
    getCinemaList().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setCinemaList(json);
      }
    });
  }, [cinemaComplexId, movieId]);

  useEffect(() => {
    const getScreeningList = async () => {
      const params = cinemaId ? { cinemaId, movieId } : { movieId };
      const response = await GetOrDelete('screenings', 'GET', {}, params);
      const json = await response.json();
      return json;
    };
    getScreeningList().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setScreeningList(json);
      }
    });
  }, [cinemaId, movieId]);

  useEffect(() => {
    const getMovieDetail = async (movieId) => {
      const response = await GetOrDelete(`movies/${movieId}`, 'GET');
      const json = await response.json();
      return json;
    };
    getMovieDetail(movieId).then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setMovieDetail(json);
      }
    });
  }, [movieId]);
  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.forms['booking-form'];
    const valueObject = {
      movieId,
      cinemaComplexId: form['elements']['select-cinema-complex-name'].value,
      cinemaId: form['elements']['select-cinema-name'].value,
      screeningId: form['elements']['select-screening-time'].value,
    };
    console.log('ValueObj:', valueObject);
    history.push({ pathname: '/booking', search: qs.stringify(valueObject) });
  };
  return (
    <section className="detail-app" style={{ backgroundImage: `url(${bg2})` }}>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col lg={3} md={6} sm={12} className="mb-4">
            <Card className="bg-dark text-white">
              <Card.Img
                className="img-fluid"
                style={{
                  minHeight: '420px',
                  maxHeight: '420px',
                  objectFit: 'cover',
                }}
                loading="lazy"
                src={movieDetail.poster}
                alt=""
              />
            </Card>
          </Col>
          <Col lg={9} md={6} sm={12} className="mb-4">
            <h1 className="text-left">{movieDetail.name}</h1>
            <p>
              <span className="font-weight-bold">Publish Date: </span>
              {moment(movieDetail.publishDate).format('DD/MM/YYYY hh:mm:ss')}
            </p>
            <p>
              <span className="font-weight-bold">Duration: </span>
              {movieDetail.duration} minutes
            </p>
            <p>
              <span className="font-weight-bold">Content: </span>
              {movieDetail.description}
            </p>
            <div className="button-group">
              <a
                className="btn btn-success mr-3"
                href={movieDetail.trailer}
                target="_blank"
                rel="noreferrer"
              >
                Trailer
              </a>
            </div>
          </Col>
        </Row>
        <form className="w-100" onSubmit={onSubmit} name="booking-form">
          <Row className=" w-100 align-items-end">
            <Col xl={3}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Cinema Complex</Form.Label>
                <Form.Control
                  name="select-cinema-complex-name"
                  as="select"
                  custom
                  defaultValue={cinemaComplexId}
                >
                  {cinemaComplexList.length ? (
                    cinemaComplexList?.map((item, index) => (
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
                <Form.Control
                  name="select-cinema-name"
                  as="select"
                  custom
                  defaultValue={cinemaId}
                >
                  {cinemaList.length ? (
                    cinemaList?.map((item, index) => (
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
                <Form.Label>Select screening</Form.Label>
                <Form.Control name="select-screening-time" as="select" custom>
                  {screeningList.length ? (
                    screeningList?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {moment(item.startTime).format('DD/MM/YYYY hh:mm:ss A')}{' '}
                        - {moment(item.endTime).format('DD/MM/YYYY hh:mm:ss A')}
                      </option>
                    ))
                  ) : (
                    <option>We are updating ....</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl={3}>
              {isLoggedIn &&
              cinemaComplexList.length &&
              cinemaList.length &&
              screeningList.length ? (
                <Button
                  className={`w-100 mb-3 btn btn-danger`}
                  variant="danger"
                  type="submit"
                >
                  Booking
                </Button>
              ) : (
                <Button
                  className={`w-100 mb-3 btn btn-danger disabled`}
                  variant="danger"
                  type="submit"
                  style={{ pointerEvents: 'none' }}
                >
                  Booking
                </Button>
              )}
            </Col>
            {
              // screeningList.length === 0 && (
              //   <p className="text-danger">There is no screening with this movie!!</p>
              // )
              screeningList.length === 0 && (
                <p className="text-danger">
                  There is no screening with this movie!!
                </p>
              )
            }
          </Row>
        </form>
      </Container>
      <Footer />
    </section>
  );
}

export default AppDetail;
