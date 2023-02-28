import React, { useState } from 'react';

const Seat = ({ seatCode, occupied, onClickTrigger }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = (code) => {
    onClickTrigger(code, isSelected);
    setIsSelected((isSelected) => !isSelected);
  };
  return (
    <div
      style={occupied ? { pointerEvents: 'none' } : {}}
      className={`seat d-flex align-items-center justify-content-center ${
        occupied ? 'occupied' : ''
      } ${isSelected ? 'selected' : ''}`}
      onClick={() => handleClick(seatCode)}
    >
      {seatCode}
    </div>
  );
};

export default Seat;
