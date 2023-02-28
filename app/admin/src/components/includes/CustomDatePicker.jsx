import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";

const CustomDatePicker = (data) => {

  const {dateInit, onChangeDate} = data;
  const initDate = dateInit ? new Date(dateInit) : new Date();
  const [startDate, setStartDate] = useState(initDate);
  
  const handleChange = (date) => {
    onChangeDate(date);
    setStartDate(date);
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      minDate={subMonths(initDate, 3)}
      maxDate={addMonths(initDate, 3)}
      dateFormat="dd/MM/yyyy"
      className="form__form-group-datepicker"
    />
  );
};

CustomDatePicker.propTypes = {
  data: PropTypes.object,
};

export default CustomDatePicker;