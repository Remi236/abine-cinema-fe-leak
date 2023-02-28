import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import pl1 from '../../img/policy1.png';
import pl2 from '../../img/policy2.png';
import '../privacy-policy/AppPrivacyPolicy.css';

function AppPrivacyPolicy() {
  return (
    <div>
      <Header />

      <Container
        className="privacy-policy-container"
        style={{ color: 'white', backgroundColor: '#090909' }}
        fluid
      >
        <h1 className="pt-4">Privacy Policy</h1>
        <Row className="mt-4">
          <Col md={6} sm={12} xs={12}>
            <img
              src={pl1}
              alt="Policy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={6} sm={12} xs={12}>
            <ul>
              <li>
                The purpose of collecting personal information is to analyze
                consumer behavior, serve the needs of members to use services
                and send notices and promotions.
              </li>
              <li>
                Scope of using information to analyze members' consumption
                behavior: Service announcements and promotions.
              </li>
              <li>
                Persons or organizations that may have access to such
                information are theater managers and the company's Marketing
                department.
              </li>
              <li>
                The address of the unit that collects and manages information,
                including contact methods so that consumers can inquire about
                the collection and processing of information related to them
                personally: The company collects information through website
                when a customer registers as a member. Customers can find out
                about the collection and processing of personal information
                through the email address abine@gmail.com.
              </li>
              <li>
                Methods and tools for consumers to access and correct their
                personal data on the e-commerce system of the information
                collecting unit: Members can log into their personal accounts
                via the website and actively adjust their information without
                the company's intervention.
              </li>
              <li>
                The website stores and secures all information provided by
                customers in the company's data system, and does not use this
                information for other purposes, other than serving the interests
                of members.
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <ul>
              <li>
                Abine Cinema does not use other information for the purpose of
                serving the interests of members at the theater. All customers
                who wish to receive promotional information and benefits via
                email or phone can register at Abine@gmail.com.
              </li>
              <li>
                Abine Cinema is responsible for ensuring the safety and security
                of the personal information they collect and store, preventing
                the following acts: (i) Stealing or accessing unauthorized
                information; (ii) Unauthorized use of information; (iii)
                Unauthorized alteration or destruction of information.
              </li>
              <li>
                Abine Cinema is responsible for using the consumer's personal
                information in accordance with the announced purpose and scope,
                except for the following cases: (i) There is a separate
                agreement with the information subject about the purpose and
                scope. use other than the stated purposes and scope; (ii) To
                provide services or products at the request of the information
                subject; and (iii) Perform obligations as prescribed by law.
              </li>
              <li>
                In the event that an information system is hacked, creating a
                risk of loss of consumer information, the information storage
                unit must notify the authorities within 24 (twenty-four) hours
                after detecting the trouble.
              </li>
              <li>
                All information provided by customers through member
                registration is kept confidential and stored in the website's
                data system. In case the information subject requests to change
                the data, he can self-adjust by logging into the website to
                self-adjust the information on his account.
              </li>
            </ul>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <img
              src={pl2}
              alt="Policy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AppPrivacyPolicy;
