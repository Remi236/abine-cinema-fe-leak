import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/register/AppRegister';
import Login from './components/login/AppLogin';
import Forgotpass from './components/forgotpassword/AppForgotpass';
import ConfirmEmail from './components/confirm-email/AppConfirmEmail';
import Home from './components/home/AppHome';
import ConfirmPassword from './components/confirm-password/AppConfirmPassword';
import Profile from './components/profile/AppProfile';
import MovieDetail from './components/movie/AppDetail';
import AboutUs from './components/aboutus/AppAboutUs';
import BookingHistiry from './components/bookinghistory/AppBookingHistory';
import FindByCinema from './components/screening/AppFindByCinema';
import Booking from './components/booking/AppBooking';
import GiftCard from './components/giftcard/AppGiftCard';
import PrivacyPolicy from './components/privacy-policy/AppPrivacyPolicy';
import PageNotFound from './components/error/AppPageNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/reg" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-pass" component={Forgotpass} />
          <Route exact path="/confirm-email" component={ConfirmEmail} />
          <Route exact path="/reset" component={ConfirmPassword} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/detail" component={MovieDetail} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/bookinghistory" component={BookingHistiry} />
          <Route exact path="/cinema" component={FindByCinema} />
          <Route path="/booking" component={Booking} />
          <Route exact path="/gift-card" component={GiftCard} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
