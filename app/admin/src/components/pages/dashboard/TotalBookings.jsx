import React, {useState, useEffect} from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import {getData, ERROR_CODES} from '../../../api';

const TotalBookings = () =>{
  const [totalBookings, setTotalBookings] = useState("loading...");

  useEffect(() => {
    const getBookingCount = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/tickets/count", {
        Authorization: `Bearer ${access_token}`,
      });
      console.log(response);
      return response;
    } 
    getBookingCount().then((response) => {
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
        setTotalBookings(response.total);
      }
    }).catch(console.error);
  },[]);

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__booking-card">
          <div className="dashboard__booking-total-container">
            <h5 className="dashboard__booking-total-title dashboard__booking-total-title--green text-truncate">
              {totalBookings}
            </h5>
            <span className="dashboard__trend-icon mdi mdi-cellphone-arrow-down"></span>
          </div>
          <h5 className="dashboard__booking-total-description">Totals Tickets Sold</h5>
        </CardBody>
      </Card>
    </Col>
  );
} 

export default TotalBookings;
