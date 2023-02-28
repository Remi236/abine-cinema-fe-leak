import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useForm from './useFormCinemaComplexs';
import validate from './cinemaComplexValidate';

const CinemaComplexForm = ({values, action, onSubmitting, iconSummit}) => {

  const disable = useRef(true);
  const {handleChange, data, errors,  handleBlur, handleSubmit} = useForm({
    id: values ? values["id"]: "",
    name: values ? values["name"]: "",
    address: values ? values["address"]: "",
  }, validate);

  const onSubmit = (e) => {
    // errors
    handleSubmit(e);
    onSubmitting(errors);
  }

  const onChange = e => {
    disable.current = false;
    handleChange(e)
  }

  return(
    <form className='form' name={`cinema_complex_${action}_form`} id={`cinema_complex_${action}_form`} onSubmit={(e) => onSubmit(e)}>
      <input type="hidden" name="id" value={data.id} />
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_name`}>Name: </label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter name" name="name" id={`${action}_form_name`} value={data.name} onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.name && <span className="form__form-group-error">{errors.name}</span>}
          </div>
        </div>
      </div>

      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_address`}>Address</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter address" name="address" id={`${action}_form_address`} value={data.address} onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.address && <span className="form__form-group-error">{errors.address}</span>}
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

CinemaComplexForm.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
  }),
  action: PropTypes.string,
  onSubmitting: PropTypes.func,
};

export default CinemaComplexForm;