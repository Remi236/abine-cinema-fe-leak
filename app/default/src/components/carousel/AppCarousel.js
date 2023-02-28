import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { AiFillPlayCircle } from 'react-icons/ai';
import '../carousel/AppCarousel.css';
import poster1 from '../../img/poster1.jpg';
import poster2 from '../../img/poster2.jpg';
import poster3 from '../../img/poster3.jpeg';
import poster4 from '../../img/poster4.jpg';

function AppCarousel() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  return (
    <Carousel fade={true} pause={false}>
      <Carousel.Item interval={10000}>
        <img
          object-fit="cover"
          className="d-block w-100"
          height="auto"
          // src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/6076e5859908f36a68b56069_mortal-kombat-1.jpg"
          src={poster1}
          alt="First slide"
        />
        <Carousel.Caption>
          <AiFillPlayCircle
            className="playicon"
            onClick={() => setShow1(true)}
          />
          <Modal
            size="lg"
            centered
            show={show1}
            onHide={() => setShow1(false)}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Body>
              <div className="embed-responsive embed-responsive-16by9">
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/-BQPKD7eozY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/-BQPKD7eozY"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          object-fit="cover"
          className="d-block w-100"
          height="auto"
          //   src="https://64.media.tumblr.com/ace001b0c16fe9f7afa6f7680f12aa2d/429da922c6a5f8c9-76/s1280x1920/fc6eaf179c5d7a15e186a8b450798f7d50fe8338.jpg"
          src={poster2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <AiFillPlayCircle
            className="playicon"
            onClick={() => setShow2(true)}
          />
          <Modal
            size="lg"
            centered
            show={show2}
            onHide={() => setShow2(false)}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Body>
              <div className="embed-responsive embed-responsive-16by9">
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/28drjVMhVVw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/28drjVMhVVw"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          object-fit="cover"
          className="d-block w-100"
          height="auto"
          //   src="https://dodofinance.com/wp-content/uploads/2021/04/Love-and-Monsters-2020-with-Dylan-OBrien-is-now-on.jpeg"
          src={poster3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <AiFillPlayCircle
            className="playicon"
            onClick={() => setShow3(true)}
          />
          <Modal
            size="lg"
            centered
            show={show3}
            onHide={() => setShow3(false)}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Body>
              <div className="embed-responsive embed-responsive-16by9">
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/-19tBHrZwOM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/-19tBHrZwOM"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          object-fit="cover"
          className="d-block w-100"
          height="auto"
          //   src="https://opencaptions.com.au/wp-content/uploads/2021/04/The-Unholy.jpg"
          src={poster4}
          alt="Four slide"
        />
        <Carousel.Caption>
          <AiFillPlayCircle
            className="playicon"
            onClick={() => setShow4(true)}
          />
          <Modal
            size="lg"
            centered
            show={show4}
            onHide={() => setShow4(false)}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Body>
              <div className="embed-responsive embed-responsive-16by9">
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/wohncvqwQuE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/wohncvqwQuE"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default AppCarousel;
