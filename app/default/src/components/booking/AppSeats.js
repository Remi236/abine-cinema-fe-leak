import React from 'react';
import Seat from './AppSeat';

const Seats = ({ rows, onClickHandler }) => {
  console.log('Rows: ', rows);
  const JSX = rows.map((seat, index) => (
    <Seat
      key={seat.seatCode + index}
      seatCode={seat.seatCode}
      occupied={seat.occupied}
      onClickTrigger={onClickHandler}
    />
  ));
  return <div className="row px-3">{JSX}</div>;
};

export default Seats;
