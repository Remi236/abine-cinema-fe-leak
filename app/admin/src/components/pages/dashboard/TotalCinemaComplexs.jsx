import React, { useEffect, useState} from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import {getData, ERROR_CODES} from '../../../api';

const TotalCinemaComplexs = () => {
  const [totalCinemaComplexs, setTotalCinemaComplexs] = useState("loading...");

  useEffect(() => {
    const getCinemasComplexCount = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/cinema-complexes/count", {
        Authorization: `Bearer ${access_token}`,
      });
      console.log(response);
      return response;
    } 
    getCinemasComplexCount().then((response) => {
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
        setTotalCinemaComplexs(response.total);
      }
    }).catch(console.error);
  },[]);

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__booking-card">
          <div className="dashboard__booking-total-container">
            <h5 className="dashboard__booking-total-title dashboard__booking-total-title--pink text-truncate">
              {totalCinemaComplexs}
            </h5>
            <span className="dashboard__trend-icon mdi mdi-card-text-outline"></span>
          </div>
          <h5 className="dashboard__booking-total-description">Cinema Complexs on active</h5>
        </CardBody>
      </Card>
    </Col>
  );
}
  

export default TotalCinemaComplexs;
