import React, { useState, useEffect } from 'react';
import { GetOrDelete } from '../../api/FuncApi';
import { Row, Col, Card } from 'react-bootstrap';
import '../movie/AppMovie.css';
import { Link } from 'react-router-dom';
import qs from 'query-string';

function AppMovieLatest() {
  const [array, setArray] = useState([]);
  useEffect(() => {
    const MovieLatest = async () => {
      const response = await GetOrDelete('movies/latest', 'GET');
      const json = await response.json();
      return json;
    };
    MovieLatest().then((json) => {
      if ([401, 404, 403, 500].includes(json.statusCode)) {
        alert(json.message);
      } else {
        setArray(json);
      }
    });
  }, []);
  return (
    <Row>
      {
        array ? 
        array.length !== 0 ? 
        array.map((item, index) => (
          <Col key={index} lg={3} md={4} sm={12} className="mb-4">
            <Card className="bg-dark text-white">
              <Card.Img
                className="img-fluid"
                style={{
                  minHeight: '420px',
                  maxHeight: '420px',
                  objectFit: 'cover',
                }}
                loading="lazy"
                src={item.poster}
                alt={item.name}
              />
              <Card.ImgOverlay>
                <Card.Text className="d-none">{item.id}</Card.Text>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Duration: {item.duration} minutes</Card.Text>
                <Link
                  to={{
                    pathname: '/detail',
                    search: qs.stringify({
                      movieId: item.id,
                    }),
                  }}
                >
                  Detail
                </Link>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))
        : 
        (
          <p className="text-danger">There is no movies showing here!!</p>
        )
        : (
          
          <p className="text-warning">We are updating ....</p>
        )
        }
    </Row>
  );
}

export default AppMovieLatest;
