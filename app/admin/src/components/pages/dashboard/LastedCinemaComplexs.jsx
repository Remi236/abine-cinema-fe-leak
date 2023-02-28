import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Col, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {GetOrDelete, ERROR_CODES} from '../../../api';

const LastedCinemaComplexs = () => {
  const [arrayCinemaComplexs, setArrayCinemaComplexs]= useState([]);
  const [isGetted, setIsGetted]= useState(false);

  useEffect(() => {
    const getarrayCinemaComplexs = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const params = {
        page: 1,
        sort: "desc"
      };
      const response = await GetOrDelete("cinema-complexes", "GET" ,{
        Authorization: `Bearer ${access_token}`,
      }, params);
      console.log(response);
      return response;
    } 
    getarrayCinemaComplexs().then((response) => {
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
        setArrayCinemaComplexs(response);
        setIsGetted(true);
      }
    }).catch(console.error);
  },[]);

  return (
    <Col md={12} lg={6} xl={4}>
      <Card>
        <CardBody>
          <div className="card__title d-flex justify-content-between">
            <h5 className="bold-text text-center">Lasted Cinema Complex</h5>
            <Link to="/managerment/cinemaComplexs"  className="text-primary">
              Manager
              <span className="mdi mdi-home-export-outline ms-2"></span>
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
                    <th>Adress</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    arrayCinemaComplexs.length ? 
                    arrayCinemaComplexs.map((item, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
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

export default LastedCinemaComplexs;