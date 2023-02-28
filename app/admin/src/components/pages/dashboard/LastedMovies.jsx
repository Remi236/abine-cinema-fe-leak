import React, {useState, useEffect} from 'react';
import {
  Card, CardBody, Col, Table,
} from 'reactstrap';
import {GetOrDelete, ERROR_CODES} from '../../../api';
import {Link} from 'react-router-dom';

const LastedMovies = () =>  {
  const [arrayMovies, setArrayMovies]= useState([]);
  const [isGetted, setIsGetted]= useState(false);

  useEffect(() => {
    const getArrayMovies = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const params = {
        page: 1,
        sort: "desc"
      };
      const response = await GetOrDelete("movies", "GET" ,{
        Authorization: `Bearer ${access_token}`,
      }, params);
      console.log(response);
      return response;
    } 
    getArrayMovies().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
        if(response.statusCode === "403") {
          window.location.href = "/403"
        }
        else {
          window.location.href = "/505";
        }
      }
      else {
        setArrayMovies(response);
        setIsGetted(true);
      }
    }).catch(console.error);
  },[]);

  return (
    <Col md={12} lg={6} xl={4}>
      <Card>
        <CardBody>
          <div className="card__title d-flex justify-content-between">
            <h5 className="bold-text text-center">Lasted Movies</h5>
            <Link to="/managerment/movies"  className="text-primary">
              Manager 
              <span className="mdi mdi-movie-roll ms-2"></span>
            </Link>
          </div>
          {
            isGetted ? 
            (
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    arrayMovies.length ? 
                    arrayMovies.map((item, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td className="text-truncate">{item.name}</td>
                      </tr>
                    )) 
                    : 
                    (
                      <tr >
                        <td colspan="3">
                          <p className="text-center text-warning">Nothing to display here!</p> 
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            )
            : <p className="text-center text-danger">Didn't get anything!</p> 
          }
          
        </CardBody>
      </Card>
    </Col>
  );
}

export default LastedMovies;