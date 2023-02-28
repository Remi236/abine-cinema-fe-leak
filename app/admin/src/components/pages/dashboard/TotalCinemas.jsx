import React, { useState, useEffect} from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';

import {getData, ERROR_CODES} from '../../../api';

const TotalCinemas = () =>  {

  const [num, setNum] = useState("loading...");

  useEffect(() => {
    const initState = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/cinemas/count", {
        Authorization: `Bearer ${access_token}`,
      });
      console.log(response);
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
        setNum(response.total);
      }
    }
    initState();
  }, []);

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__booking-card">
          <div className="dashboard__booking-total-container">
            <h5 className="dashboard__booking-total-title dashboard__booking-total-title--blue text-truncate">
             {num}
            </h5>
            <span className="dashboard__trend-icon mdi mdi-credit-card-settings-outline"></span>
          </div>
          <h5 className="dashboard__booking-total-description">Cinemas on active</h5>
        </CardBody>
      </Card>
    </Col>
  );
}

export default TotalCinemas;
