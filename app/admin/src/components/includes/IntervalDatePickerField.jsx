import React, {useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import className from 'classnames';
// import MinusIcon from 'mdi-react/MinusIcon';
import PropTypes from 'prop-types';
import subYears  from "date-fns/subYears";

const IntervalDatePickerField = ({onChange}) => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dateFromData = useRef(startDate);
  const dateToData = useRef(endDate);

  const handleChangeStart = newStartDate => handleChange("start",newStartDate);
  const handleChangeEnd = newEndDate => handleChange("end", newEndDate );
  const  handleChange = (type, newDate) => {
    switch (type) {
      case "start":
        dateFromData.current = newDate;
        setStartDate(newDate);
        break;
      case "end":
        dateToData.current = newDate;
        setEndDate(newDate);
        break;
      default:
        break;
    }
    onChange(dateFromData.current, dateToData.current);
  }

  const classDisplay = className({
    'date-picker': true,
    'date-picker--interval': true,
  });

  return (
    <div className={classDisplay}>
      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={subYears(startDate, 2)}
        onChange={handleChangeStart}
        placeholderText="From"
        dropDownMode="select"
        className="form__form-group-datepicker"
      />
      {/* <MinusIcon className="" /> */}
      <span className="mdi mdi-minus date-picker__svg"></span>
      <DatePicker
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        // maxDate={endDate}
        onChange={handleChangeEnd}
        placeholderText="To"
        dropDownMode="select"
        className="form__form-group-datepicker"
      />
    </div>
  );
}


IntervalDatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default IntervalDatePickerField;
