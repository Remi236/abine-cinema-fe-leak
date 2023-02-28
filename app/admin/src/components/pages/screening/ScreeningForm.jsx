import React, { useState,useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import useForm from './useFormScreening';
import validate from './screeningValidate';
import CustomDateTimePicker from '../../includes/CustomDateTimePicker';
import {getData, ERROR_CODES} from '../../../api';
const ScreeningForm = ({values, action, onSubmitting, iconSummit}) => {

  const disable = useRef(true);
  const [startTime, setStartTime] = useState(values ? moment(values["startTime"], "DD/MM/YYYY hh:mm:ss A").toISOString(): new Date().toISOString());
  const [endTime, setEndTime] = useState(values ? moment(values["endTime"], "DD/MM/YYYY hh:mm:ss A").toISOString(): new Date().toISOString());

  const [selectedCinema, setSelectedCinema] = useState(values ? values["cinemaId"] : "-1");
  const [selectedMovie, setSelectedMovie] = useState(values ? values["MovieId"] : "-1");

  const [cinemaList, setCinemaList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const {handleChange, data, errors,  handleBlur, handleSubmit} = useForm({
    id: values ? values["id"]: "",
    cinemaId: values ? values["cinemaId"]: "",
    movieId: values ? values["movieId"]: "",
    startTime: values ? values["startTime"]: "",
    endTime: values ? values["endTime"]: "",
    price: values ? values["price"]: "",
  }, validate);

  // cinemas
  useEffect(() => {
    const getCinema = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/cinemas", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    };
    getCinema().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
      }
      else {
        setCinemaList(response);
      }
    }).catch(console.error);
  },[]);

  // movies
  useEffect(() => {
    const getMovie = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/movies", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    };
    getMovie().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
      }
      else {
        setMovieList(response);
      }
    }).catch(console.error);
  },[]);

  const selectCinemaChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_cinema`);
    setSelectedCinema(select_input.value);
    handleChange(e);
  }
  const blurCinemaChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_cinema`);
    setSelectedCinema(select_input.value);
    handleBlur(e);
  }
  
  const selectMovieChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_movie`);
    setSelectedMovie(select_input.value);
    handleChange(e);
  }
  const blurMovieChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_movie`);
    setSelectedMovie(select_input.value);
    handleBlur(e);
  }

  const onSubmit = (e) => {
    // errors
    handleSubmit(e);
    onSubmitting(errors);
  }

  const onChange = e => {
    disable.current = false;
    handleChange(e)
  }

  const onChangeStartTime = (time) => {
    disable.current = false;
    const input = document.querySelector(`#${action}_form_start_time`);
    input.value = time.toISOString();
    let newTime = startTime === time ? startTime: time;
    // console.log(newTime);
    setStartTime(newTime.toISOString());
  }

  const onChangeEndTime = (time) => {
    disable.current = false;
    const input = document.querySelector(`#${action}_form_end_time`);
    input.value = time.toISOString();
    let newTime = endTime === time ? endTime: time;
    // console.log(newTime);
    setEndTime(newTime.toISOString());
  }

  return(
    <form className='form' name={`screening_${action}_form`} id={`screening_${action}_form`} onSubmit={(e) => onSubmit(e)}>
      <input type="hidden" name="id" value={data.id} />
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_select_cinema`}>Cinema</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            {/* <input type="hidden" placeholder="enter name" name="cinema_hidden" value={selectedCinemaComplex} onChange={(e) => onChange(e)} /> */}

            <select name="cinema_id" id={`${action}_form_select_cinema`} className="react-select__control react-select__input form__input_select w-100"  onChange={selectCinemaChange} value={selectedCinema} onBlur={blurCinemaChange}>
              <option value="-1"  selected={!data.cinemaId}>Select Cinema</option>
              {
                cinemaList.map(item => (
                  <option value={item.id} selected={item.id === data.cinemaId}>{item.name}</option>
                ))
              }
            </select>
            { errors.cinema_id && <span className="form__form-group-error">{errors.cinema_id}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_select_movie`}>Movie</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">

            <select name="movie_id" id={`${action}_form_select_movie`} className="react-select__control react-select__input form__input_select w-100"  onChange={selectMovieChange} value={selectedMovie} onBlur={blurMovieChange}>
              <option value="-1"  selected={!data.movieId}>Select Movie</option>
              {
                movieList.map(item => (
                  <option value={item.id} selected={item.id === data.movieId}>{item.name}</option>
                ))
              }
            </select>
            { errors.movie_id && <span className="form__form-group-error">{errors.movie_id}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_start_time`}>Start Time</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="hidden" placeholder="enter start time" name="startTime" id={`${action}_form_start_time`} value={startTime} />
            <CustomDateTimePicker dateInit={startTime} onChangeDate={onChangeStartTime}  />
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_end_time`}>End Time</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="hidden" placeholder="enter end time" name="endTime" id={`${action}_form_end_time`} value={endTime} />
            <CustomDateTimePicker dateInit={endTime} onChangeDate={onChangeEndTime}  />
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_price`}>Price</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter price" name="price" id={`${action}_form_price`} value={ data.price } onChange={(e) => onChange(e)} onBlur={handleBlur}/>

            { errors.price && <span className="form__form-group-error">{errors.price}</span>}
          </div>
        </div>
      </div>
      
      <button type="submit" className={`form__button-toolbar btn w-100 d-block text-center btn-toolbar btn-primary ${disable.current ? 'disabled' : ''}`}>
          <span className="me-1">Submit</span>     
         {iconSummit}
      </button>
    </form>
  );
}

ScreeningForm.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    first: PropTypes.string,
    last: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.string,
  }),
  action: PropTypes.string,
  onSubmitting: PropTypes.func,
};

export default ScreeningForm;