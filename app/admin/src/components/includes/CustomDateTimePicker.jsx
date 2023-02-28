import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";

const CustomDateTimePicker = (data) => {
  
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
      timeInputLabel="Time:"
      dateFormat="dd/MM/yyyy h:mm aa"
      showTimeInput
      className="form__form-group-datepicker w-100"
    />
  );
};

CustomDateTimePicker.propTypes = {
  data: PropTypes.object,
};

export default CustomDateTimePicker;