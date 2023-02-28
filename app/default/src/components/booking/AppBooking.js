import React, { useState, useRef, useEffect } from 'react';
import '../booking/AppBooking.css';
import screen from '../../img/screen-thumb.png';
import bookingbg from '../../img/bookingbg.jpg';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import { PostOrPut, GetOrDelete } from '../../api/FuncApi';
import moment from 'moment';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { draw2DArray } from '../../helper/SeatDraw';
import Seats from './AppSeats';
import { ReactComponent as ZaloLogo } from '../../img/ZaloPay_Logo.svg';
import { ReactComponent as Palpay } from '../../img/paypal-logo.svg';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import Alert from '../alertmodal/AppAlertModal';

function AppBooking() {
  const [seatList, setSeatList] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({ count: 0, total: 0 });
  const [arraySeat, setArraySeat] = useState([]);
  const price = useRef(0);
  const location = useLocation();
  const queryParam = qs.parse(location.search);
  const { screeningId } = queryParam;
  const [cinemaComplexName, setCinemaComplexName] = useState('');
  const [cinemaName, setCinemaName] = useState('');
  const [movieName, setMovieName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState('');
  const [color, setColor] = useState('');
  const history = useHistory();
  const onCloseAlert = () => {
    setIsAlert(false);
  };
  useEffect(() => {
    const getBookingBooked = async () => {
      const access_token = sessionStorage.getItem('access_token');

      const response = await GetOrDelete(
        `bookings/booked/${screeningId}`,
        'GET',
        {
          Authorization: `Bearer ${access_token}`,
        },
      );
      const json = await response.json();
      return json;
    };
    getBookingBooked()
      .then((json) => {
        if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
          alert(json.message);
        } else {
          console.log(json);
          const seats = draw2DArray(
            json.screening.cinema.width,
            json.screening.cinema.height,
            json.bookedSeats,
          );
          setCinemaComplexName(json.screening.cinema.cinemaComplex.name);
          setCinemaName(json.screening.cinema.name);
          setMovieName(json.screening.movie.name);
          setStartTime(json.screening.startTime);
          setEndTime(json.screening.endTime);
          setSeatList(seats);
          price.current = json.price;
        }
      })
      .catch(console.error);
  }, [screeningId]);

  const caculateBooking = (seatCode, isPicked) => {
    const money = price.current;
    const newBookingInfo = {
      count: bookingInfo.count,
      total: bookingInfo.total,
    };
    if (!isPicked) {
      newBookingInfo.count += 1;
      newBookingInfo.total += money;
      setArraySeat([...arraySeat, seatCode]);
    } else {
      const count = newBookingInfo.count;
      const total = newBookingInfo.total;
      newBookingInfo.count = count === 0 ? 0 : count - 1;
      newBookingInfo.total = total === 0 ? 0 : total - money;
      const newArraySeat = arraySeat.filter((s) => s !== seatCode);
      setArraySeat(newArraySeat);
    }
    console.log(newBookingInfo);
    setBookingInfo(newBookingInfo);
  };
  // const handleMethod = (e) => {
  //   let booking_method = document.querySelector("#booking_method");
  //   booking_method.value = e.target.value;
  // }
  const onBookingClick = (e) => {
    e.target.disabled = true;
    // const form = document.forms['select-form-name'];
    const valuesObject = {
      screeningId,
      seats: arraySeat,
    };

    // console.log("method: ", payment_method);
    console.log('VALUEOBJ:', valuesObject);
    const bookingApi = async (valuesObject) => {
      const access_token = sessionStorage.getItem('access_token');
      const response = await PostOrPut(`bookings`, 'POST', valuesObject, {
        Authorization: `Bearer ${access_token}`,
      });
      const json = await response.json();
      return json;
    };
    bookingApi(valuesObject)
      .then((json) => {
        console.log('JSON:', json);
        if ([400, 401, 404, 403, 500].includes(json.statusCode)) {
          alert(json.message);
        } else {
          // alert('Booking successFully!!');
          setIsAlert(true);
          setHeader('Booking successFully!!!');
          setContent('Congratulations!');
          setColor('success');
          setTimeout(() => {
            history.push('/');
          }, 1000);
        }
      })
      .catch(console.error);
    // }
    // else if(payment_method payment_method "stripe") {
    //   const handleStripePayment = async (valuesObject) => {
    //     const response = await PostOrPut(
    //       'stripe/checkout-session',
    //       'POST',
    //       valuesObject,
    //     );
    //     const json = await response.json();
    //     return json;
    //   }

    //   handleStripePayment(valuesObject).then(json => {
    //     const { session } = json;
    //     console.log(session);
    //     if (!stripe) {
    //       throw new Error('kec');
    //     }
    //     // When the customer clicks on the button, redirect them to Checkout.
    //     const result = stripe.redirectToCheckout({
    //       sessionId: session.id,
    //     });

    //     if (result.error) {
    //       console.error('ket');
    //       // If `redirectToCheckout` fails due to a browser or network
    //       // error, display the localized error message to your customer
    //       // using `result.error.message`.
    //     }
    //   }).catch(console.error);
    // }
  };
  return (
    <div
      className="booking-container"
      style={{
        background: `linear-gradient(rgba(0, 18, 50, 0.84), rgba(0, 0, 0, 0.95)),url(${bookingbg}) bottom`,
      }}
    >
      <Alert
        content={content}
        heading={header}
        color={color}
        isShow={isAlert}
        onClose={onCloseAlert}
      />
      <Header />
      <Container>
        <Row>
          <Col md={8} sm={12}>
            <div className="booking-movie">
              <div className="container">
                <div>
                  <h5>
                    <span style={{ color: '#6feaf5' }}>Cinema Complex:</span>{' '}
                    {cinemaComplexName}
                  </h5>
                  <h5>
                    {' '}
                    <span style={{ color: '#6feaf5' }}>Cinema:</span>{' '}
                    {cinemaName}
                  </h5>
                  <h5>
                    <span style={{ color: '#6feaf5' }}>Movie: </span>
                    {movieName}
                  </h5>
                  <h5>
                    <span style={{ color: '#6feaf5' }}>Start time: </span>
                    {moment(startTime).format('DD/MM/YYYY hh:mm:ss')}
                  </h5>
                  <h5>
                    <span style={{ color: '#6feaf5' }}>End time: </span>
                    {moment(endTime).format('DD/MM/YYYY hh:mm:ss')}
                  </h5>
                </div>
                <ul className="showcase flex-md-row flex-wrap">
                  <li className="my-3">
                    <div className="seat" />
                    <small>N/A</small>
                  </li>
                  <li className="my-3">
                    <div className="seat selected" />
                    <small>Selected</small>
                  </li>
                  <li className="my-3">
                    <div className="seat occupied" />
                    <small>Occupied</small>
                  </li>
                </ul>
              </div>
              <div className="container mb-5">
                <div className="movie-screen">
                  <img src={screen} alt="screen" />
                </div>
                <div className="row-container screenings">
                  {seatList.map((item, index) => (
                    <Seats
                      key={index}
                      rows={item}
                      onClickHandler={caculateBooking}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} className="mt-5">
            <div className="text-wrapper text-white">
              <p className="text">
                Selected Seats <span id="count">{bookingInfo.count}</span>
              </p>
              <p className="text">
                Total Price{' '}
                <span id="total">
                  {bookingInfo.total.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>{' '}
              </p>
            </div>
            <div className="payment-method text-white">
              <h5>Payment Method</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment-method"
                  id="cash-method"
                  value="cash"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="cash-method">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon"
                    viewBox="0 0 512 512"
                    fill="#fff"
                  >
                    <path d="M448 400H64a16 16 0 010-32h384a16 16 0 010 32zM416 448H96a16 16 0 010-32h320a16 16 0 010 32zM32 272H16v48a32 32 0 0032 32h48v-16a64.07 64.07 0 00-64-64z" />
                    <path d="M480 240h16v-64h-16a96.11 96.11 0 01-96-96V64H128v16a96.11 96.11 0 01-96 96H16v64h16a96.11 96.11 0 0196 96v16h256v-16a96.11 96.11 0 0196-96zm-224 64a96 96 0 1196-96 96.11 96.11 0 01-96 96z" />
                    <circle cx="256" cy="208" r="64" />
                    <path d="M416 336v16h48a32 32 0 0032-32v-48h-16a64.07 64.07 0 00-64 64zM480 144h16V96a32 32 0 00-32-32h-48v16a64.07 64.07 0 0064 64zM96 80V64H48a32 32 0 00-32 32v48h16a64.07 64.07 0 0064-64z" />
                  </svg>
                  Cash
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment-method"
                  id="momo-method"
                  value="momo"
                  disabled
                />
                <label className="form-check-label" htmlFor="momo-method">
                  <svg
                    width="46"
                    className="svg-icon fill-current momo__logo "
                    height="37"
                    viewBox="0 0 96 87"
                    fill="#af2070"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M75.5326 0C64.2284 0 55.0651 8.74843 55.0651 19.5409C55.0651 30.3333 64.2284 39.0818 75.5326 39.0818C86.8368 39.0818 96 30.3333 96 19.5409C96 8.74843 86.8368 0 75.5326 0ZM75.5326 27.8805C70.7368 27.8805 66.8403 24.1604 66.8403 19.5818C66.8403 15.0031 70.7368 11.283 75.5326 11.283C80.3283 11.283 84.2248 15.0031 84.2248 19.5818C84.2248 24.1604 80.3283 27.8805 75.5326 27.8805ZM49.1561 14.6761V39.1226H37.3809V14.5535C37.3809 12.7138 35.8394 11.2421 33.9126 11.2421C31.9857 11.2421 30.4442 12.7138 30.4442 14.5535V39.1226H18.669V14.5535C18.669 12.7138 17.1276 11.2421 15.2007 11.2421C13.2739 11.2421 11.7324 12.7138 11.7324 14.5535V39.1226H0V14.6761C0 6.58176 6.89385 0 15.372 0C18.8403 0 22.0089 1.10377 24.5781 2.9434C27.1472 1.10377 30.3586 0 33.7841 0C42.2623 0 49.1561 6.58176 49.1561 14.6761ZM75.5326 47.544C64.2284 47.544 55.0651 56.2925 55.0651 67.0849C55.0651 77.8774 64.2284 86.6258 75.5326 86.6258C86.8368 86.6258 96 77.8774 96 67.0849C96 56.2925 86.8368 47.544 75.5326 47.544ZM75.5326 75.4245C70.7368 75.4245 66.8403 71.7044 66.8403 67.1258C66.8403 62.5472 70.7368 58.827 75.5326 58.827C80.3283 58.827 84.2248 62.5472 84.2248 67.1258C84.2248 71.7044 80.3283 75.4245 75.5326 75.4245ZM49.1561 62.2201V86.6667H37.3809V62.0975C37.3809 60.2579 35.8394 58.7862 33.9126 58.7862C31.9857 58.7862 30.4442 60.2579 30.4442 62.0975V86.6667H18.669V62.0975C18.669 60.2579 17.1276 58.7862 15.2007 58.7862C13.2739 58.7862 11.7324 60.2579 11.7324 62.0975V86.6667H0V62.2201C0 54.1258 6.89385 47.544 15.372 47.544C18.8403 47.544 22.0089 48.6478 24.5781 50.4874C27.1472 48.6478 30.3158 47.544 33.7841 47.544C42.2623 47.544 49.1561 54.1258 49.1561 62.2201Z"></path>
                  </svg>
                  MoMo
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment-method"
                  id="zalopay-method"
                  value="zalopay"
                  disabled
                  // disabled
                />
                <label className="form-check-label" htmlFor="zalopay-method">
                  <ZaloLogo />
                  ZaLoPay
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment-method"
                  id="paypal-method"
                  value="paypal"
                  disabled
                />
                <label className="form-check-label" htmlFor="stripe-method">
                  <Palpay />
                  Stripe
                </label>
              </div>
            </div>
            <div className="text-wrapper payment">
              <Button
                className="w-100 mb-3"
                variant="danger"
                onClick={onBookingClick}
                disabled={!arraySeat.length}
              >
                Book now!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AppBooking;
