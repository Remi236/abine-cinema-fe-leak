import React ,{useState,useEffect}from 'react'
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import { Container ,Table,Row,Col} from 'react-bootstrap';
import {GetOrDelete} from '../../api/FuncApi';
import moment from 'moment';

function AppBookingHistory() {
    const [bookingList, setBookingList] = useState([]);
    const [ticketList, setTicketList] = useState([]);
    useEffect(() => {
        const getBookingList= async() => {
            const access_token=sessionStorage.getItem('access_token');
            const response=await GetOrDelete('bookings','GET',{
                Authorization:`Bearer ${access_token}`,
            });
            const json=await response.json();
            return json;
        }
        getBookingList().then((json)=>{
            if([401,404,403,500].includes(json.statusCode)){
                alert(json.message);
             }
             else{
                 console.log(json);
                setBookingList(json);
             }
        })
    }, [])
    const ShowTickets=(ArrayTicket)=>{
        setTicketList(ArrayTicket);
    }
    return (
        <div style={{backgroundColor:'#111111',minHeight:'100vh'}}>
            <Header/>
                <Container className="pb-4" style={{backgroundColor:'#111111'}} fluid>
                    <h1 className="py-3">Booking History</h1>
                    <Row>
                        <Col lg={9} md={6} sm={12}>
                            <Table striped bordered hover variant="dark" size="sm" responsive>
                                <thead>
                                    <tr style={{backgroundColor:'crimson'}}>
                                        <th>No</th>
                                        <th style={{width:'10%'}}>Booking ID</th>
                                        <th>Cinema</th>
                                        <th>Movie</th>
                                        <th>Booking Time</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookingList.map((item,index)=>(
                                            <tr key={index} onClick={()=>ShowTickets(item.ticket)}>
                                                <td>{++index}</td>
                                                <td style={{maxWidth:'100px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} className="text-truncate">{item.id}</td>
                                                <td>{item.screening.cinema.name}</td>
                                                <td>{item.screening.movie.name}</td>
                                                <td>{moment(item.bookingTime).format("DD/MM/YYYY hh:mm:ss")}</td>
                                                <td>{item.totalPrice} VND</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <Table  striped bordered hover variant="dark" size="sm" responsive>
                                <thead>
                                    <tr style={{backgroundColor:'crimson'}}>
                                        <th>No</th>
                                        <th>Seat Code</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ticketList.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item.seatCode}</td>
                                                <td>{item.price} VND</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            <Footer/>
        </div>
    )
}

export default AppBookingHistory
