import React, { useState,useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from './useFormCinema';
import validate from './cinemaValidate';

import {ERROR_CODES, getData} from '../../../api';

const CinemaForm = ({values, action, onSubmitting, iconSummit}) => {

  const disable = useRef(true);

  const [cinemaComplexsList, setCinemaComplexsList] = useState([]);
  const [selectedCinemaComplex, setSelectedCinemaComplex] = useState(values ? values["cinemaComplexId"] : "-1");

  const {handleChange, data, errors,  handleBlur, handleSubmit} = useForm({
    id: values ? values["id"]: "",
    name: values ? values["name"]: "",
    type: values ? values["type"]: "",
    width: values ? values["width"]: "",
    height: values ? values["height"]: "",
    cinemaComplexId: values ? values["cinemaComplexId"]: "",
  }, validate);

  useEffect(() => {
    const getCinemaComplexs = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/cinema-complexes", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    };
    getCinemaComplexs().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
      }
      else {
        setCinemaComplexsList(response);
      }
    }).catch(console.error);
  },[])

  const onSubmit = (e) => {
    // errors
    handleSubmit(e);
    onSubmitting(errors);
  }

  const onChange = e => {
    disable.current = false;
    handleChange(e)
  }

  const selectChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_cinema_complex`);
    setSelectedCinemaComplex(select_input.value);
    handleChange(e);
  }
  const blurChange = (e) => {
    let select_input = document.querySelector(`#${action}_form_select_cinema_complex`);
    setSelectedCinemaComplex(select_input.value);
    handleBlur(e);
  }

  return(
    <form className='form' name={`cinema_${action}_form`} id={`cinema_${action}_form`} onSubmit={(e) => onSubmit(e)}>
      <input type="hidden" name="id" value={data.id} />
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_select_cinema_complex`}>Cinema Complesx</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            {/* <input type="hidden" placeholder="enter name" name="cinema_complex_hidden" value={selectedCinemaComplex} onChange={(e) => onChange(e)} /> */}

            <select name="cinema_complex_id" id={`${action}_form_select_cinema_complex`} className="react-select__control react-select__input form__input_select w-100"  onChange={selectChange} value={selectedCinemaComplex} onBlur={blurChange}>
              <option value="-1"  selected={!data.cinemaComplexId}>Select Cinema complex</option>
              {
                cinemaComplexsList.map(item => (
                  <option value={item.id} selected={item.id === data.cinemaComplexId}>{item.name}</option>
                ))
              }
            </select>
            { errors.cinema_complex_id && <span className="form__form-group-error">{errors.cinema_complex_id}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form__name`}>Name</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter name" name="name" id={`${action}_form__name`} value={data.name} onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.name && <span className="form__form-group-error">{errors.name}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_type`}>Type</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter type" name="type" id={`${action}_form_type`} value={data.type} onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.type && <span className="form__form-group-error">{errors.type}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_width`}>Width</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="number" placeholder="enter width" name="width" id={`${action}_form_width`} value={ data.width } onChange={(e) => onChange(e)} onBlur={handleBlur}/>

            { errors.width && <span className="form__form-group-error">{errors.width}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_height`}>Height</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="number" placeholder="enter height" name="height" id={`${action}_form_height`} value={ data.height } onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.height && <span className="form__form-group-error">{errors.height}</span>}
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

CinemaForm.propTypes = {
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

export default CinemaForm;