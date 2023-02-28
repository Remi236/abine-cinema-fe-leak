import React from 'react';
import { Container } from 'react-bootstrap';
import '../aboutus/AppAboutUs.css';
import kendu from '../../img/kendu.jpg';
import gacon from '../../img/gacon.jpg';
import remi from '../../img/remi.jpg';
import abin from '../../img/abin.jpg';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';

function AppAboutUs() {
  return (
    <div>
      <Header />
      <Container style={{ backgroundColor: '#111111' }} fluid>
        <div className="team-section">
          <div className="team-container">
            <div className="team-row">
              <div className="section-title">
                <h1>About us</h1>
                <p>
                  Abine Cinema Complex is known for its first cinema complex
                  with 100 screens in 2021, at Maximark 3/2 (now Vincom 3/2).
                  Since 2021, Abine Cinema is the only cinema cluster of
                  Vietnamese enterprises with strong growth potential, through
                  the continuous opening of new cinema locations, in prime areas
                  of Ho Chi Minh City, Hanoi, Da Nang and other provinces.
                </p>
              </div>
            </div>
            <div className="team-row pb-4">
              <div className="team-items">
                <div className="item">
                  <img
                    src={kendu}
                    alt="Kendu"
                    style={{
                      objectFit: 'cover',
                      maxHeight: '350px',
                      minHeight: '350px',
                    }}
                  />
                  <div className="inner">
                    <div className="info">
                      <h5>Huỳnh Ngọc Ninh Bình</h5>
                      <p>18600004</p>
                      <div>Backend Developer</div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <img
                    src={gacon}
                    alt="Gacon"
                    style={{
                      objectFit: 'cover',
                      maxHeight: '350px',
                      minHeight: '350px',
                    }}
                  />
                  <div className="inner">
                    <div className="info">
                      <h5>Quách Hải Trung</h5>
                      <p>18600016</p>
                      <div>Frontend Developer</div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <img
                    src={remi}
                    alt="Remi"
                    style={{
                      objectFit: 'cover',
                      maxHeight: '350px',
                      minHeight: '350px',
                    }}
                  />
                  <div className="inner">
                    <div className="info">
                      <h5>Đào Anh Tú</h5>
                      <p>18600302</p>
                      <div>Frontend Developer</div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <img
                    src={abin}
                    alt="Abin"
                    style={{
                      objectFit: 'cover',
                      maxHeight: '350px',
                      minHeight: '350px',
                    }}
                  />
                  <div className="inner">
                    <div className="info">
                      <h5>Nguyễn Thanh Xuân</h5>
                      <p>18600326</p>
                      <div>Database Manager</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-title">
                <h2>OPERATION OBJECTIVES</h2>
                <p className="text-left">
                  These goals were established by Abine Cinema Complex as a
                  guideline for Theater Management to ensure the perfect
                  cinematic experience for customers.
                </p>
                <p className="text-left">
                  <span
                    className="font-weight-bold mr-1"
                    style={{ color: 'crimson' }}
                  >
                    + Customer service:
                  </span>
                  We are committed to the highest standard of service quality by
                  satisfying customer requirements in a timely, complete and
                  professional manner.
                </p>
                <p className="text-left">
                  <span
                    className="font-weight-bold mr-1"
                    style={{ color: 'crimson' }}
                  >
                    + Comfortable space:
                  </span>
                  We are committed to providing a clean, comfortable and
                  convenient space, so that customers always feel appreciated
                  and well served.
                </p>
                <p className="text-left">
                  <span
                    className="font-weight-bold mr-1"
                    style={{ color: 'crimson' }}
                  >
                    + Best quality:
                  </span>
                  We are committed to providing the highest standard of sound
                  and picture quality to preserve, promote and enhance the
                  cinematic experience that filmmakers and moviegoers expect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default AppAboutUs;
