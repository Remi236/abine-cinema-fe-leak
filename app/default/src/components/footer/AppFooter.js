import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../footer/AppFooter.css';
import {
  AiTwotoneEnvironment,
  AiTwotonePhone,
  AiFillMail,
} from 'react-icons/ai';
import cgv from '../../img/cgv.jpg';
import bhd from '../../img/bhd.png';
import galaxy from '../../img/galaxy.jpg';
import lotte from '../../img/lotte.jpg';
import cinestar from '../../img/cinestar.png';
import megags from '../../img/megags.jpg';
import cinebox from '../../img/cinebox.png';

function AppFooter() {
  return (
    <Container fluid>
      <Row>
        <Col sm>
          <div className="mt-2">
            <img
              alt="Logo"
              src="/logo.svg"
              width="45"
              height="45"
              className="d-inline-block align-top"
            />
            <span className="logo-text">Abine</span>
          </div>
          <p className="text-intro">
            Abine is a website that allows you to book tickets online and
            regularly update information such as trailers, showtimes,... from
            cinemas nationwide. We hope you can enjoy the movies to the fullest!
          </p>
        </Col>
        <Col sm>
          <p className="text-category">Contact</p>
          <div className="icon-ai">
            <AiTwotoneEnvironment />
            <span>227 Nguyen Van Cu W.4 D.5 Ho Chi Minh</span>
          </div>
          <div className="icon-ai">
            <AiTwotonePhone />
            <span> (+84) 0932982305</span>
          </div>
          <div className="icon-ai">
            <AiFillMail />
            <span> Abine@gmail.com</span>
          </div>
        </Col>
        <Col sm>
          <p className="text-category">Partner</p>
          <div className="cinema-logo">
            <img
              alt="CGV"
              // src="https://banner2.cleanpng.com/20181203/orv/kisspng-cj-cgv-vietnam-cinema-cj-group-film-5c052597d5d118.5029003415438411758758.jpg"
              src={cgv}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            <img
              alt="BHD"
              // src="https://cdn.moveek.com/media/cache/square/dcc08eb55eca8002f729ae0dff98a2ae6c031db0.png"
              src={bhd}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
            <img
              alt="GalaxyCinema"
              // src="https://static.mservice.io/placebrand/s/momo-upload-api-200310155910-637194527506019333.png"
              src={galaxy}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
            <img
              alt="Lottle"
              // src="https://i.pinimg.com/originals/ce/da/5e/ceda5e00621165d09bf05fcd1664b445.jpg"
              src={lotte}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
            <img
              alt="CineStar"
              // src="https://cinestar.com.vn/pictures/400x400.png"
              src={cinestar}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
            <img
              alt="MegaGS"
              // src="https://yt3.ggpht.com/ytc/AAUvwnhhqPrCvaYxskfkJEtI8gfopppKzrEx0KfIrzt4=s900-c-k-c0x00ffffff-no-rj"
              src={megags}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
            <img
              alt="CineBox"
              // src="https://moveek.com/bundles/ornweb/img/no-thumbnail.png"
              src={cinebox}
              width="50"
              height="50"
              margin-left="5px"
              className="d-inline-block align-top"
            />
          </div>
        </Col>
      </Row>
      <footer className="footer-copyright">&copy;2021 Abine Cinema</footer>
    </Container>
  );
}

export default AppFooter;
