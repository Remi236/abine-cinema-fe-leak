import React from 'react';

const Loading = ({ load }) => (
  <div className={`load${load ? '' : ' loaded'}`}>
    <div className="load__icon-wrap">
      <svg className="load__icon">
        <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </div>
  </div>
);
export default Loading;
