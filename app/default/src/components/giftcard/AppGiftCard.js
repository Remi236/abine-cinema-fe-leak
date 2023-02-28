import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AbineCard from '../../img/abinecard.png';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import '../giftcard/AppGiftCard.css';

function AppGiftCard() {
  return (
    <div>
      <Header />

      <Container
        className="gift-card-container"
        style={{ color: 'white', backgroundColor: '#090909' }}
        fluid
      >
        <Row className="m-2">
          <h1 className="pt-4">The Gift Card</h1>
          <p>
            Abine Cinemas introduces Gift Card with modern and convenient
            payment option. Now, you can share the magic of Abine movies with
            your friends, family, colleagues, or business partners with a gift
            that is better than cash. Definitely, this is the best gift to
            express your friendship and respect that the receiver will always
            remember.
          </p>
          <p>
            With a premium look, you can conveniently choose from 3 initial
            top-ups: 300,000 VND , 500,000 VND or 1,000,000 VND. Honored just
            like cash, CGV gift cards can be used for movie tickets or
            concessions. It's the gift that keeps giving because gift card is
            valid for up to 1 year and they can be topped up to extend expiry
            date at anytime. You can buy gift card easily without any
            registration.
          </p>
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <img
              style={{ maxWidth: '100%', height: 'auto' }}
              src={AbineCard}
              alt="Abine_Card"
            />
          </Col>
          <Col md={6} sm={12} xs={12}>
            <ul>
              <li>
                The Gift Card is a prepaid card. With the amount in the card,
                you can use the Card to exchange for movie tickets or any
                product at Abine Cinemas' counter.
              </li>
              <li>
                With its luxurious appearance and convenience, you can choose
                denominations for Gift Cards such as 300,000 VND; 500,000 VND;
                or 1,000,000 VND. The card is valid for 1 year and especially
                you can top up to renew it at any time. You can buy a card
                easily without registering cardholder information.
              </li>
              <li>
                Gift cards are on sale at ticket counters at Cinemas nationwide.
                The gift card can be integrated into the member account, and
                convenient payment with the membership card when not carrying
                the gift card.
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="m-2">
          <h1>TERMS AND CONDITIONS</h1>
          <ul>
            <li>
              Gift cards are honored, just like at cash, at box office,
              concession counter and can be redeemed online.
            </li>
            <li>
              Gift cards can be top-upped and extend expiry date at box office
              or online anytime with a minimum top-up amount of 300,000 VND.
            </li>
            <li>
              Exclusively for gift cards that are registered to member's account
              online, the expiry date of all pre-owned cards will be extended to
              the last gift card's expiry date.
            </li>
            <li>
              Points and total spending are applied for gift card's user, not
              applicable for gift card's purchaser.
            </li>
            <li>
              Gift cards cannot be exchanged for cash or used to purchase other
              gift cards.
            </li>
            <li>
              If gift card is lost, stolen, damaged or destroyed, the remaining
              value of the card cannot be honored or replaced without proof of
              purchase and proper identification.
            </li>
          </ul>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AppGiftCard;
