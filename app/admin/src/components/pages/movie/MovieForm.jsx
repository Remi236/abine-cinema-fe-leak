import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import CustomDatePicker from '../../includes/CustomDatePicker';
import CustomDropzone from '../../includes/CustomDropZone';
import moment from 'moment';

import useForm from './useFormMovie';
import validate from './movieValidate';

const MovieForm = ({values, action, onSubmitting, iconSummit}) => {

  const [disable, setDiable] = useState(true);
  //const [blob, setBlob] = useState("");
  // console.log(moment(values["publishDate"], "DD/MM/YYYY hh:mm:ss A").toISOString());
  const [linkPreview, setLinkPreview] = useState(values ? values["poster"] : "");
<<<<<<< HEAD
  const [changePublishDate, setCangePublishDate] = useState(values ? values["publishDate"] : "");
=======
  const [description, setDescription] = useState(values ? values["description"] : "");
  const [changePublishDate, setChangePublishDate] = useState(values ? moment(values["publishDate"], "DD/MM/YYYY hh:mm:ss A").toISOString() : new Date().toISOString());
>>>>>>> 182db25 (fix managerment movie & screening)

  const {handleChange, data, errors,  handleBlur, handleSubmit} = useForm({
    id: values ? values["id"]: "",
    name: values ? values["name"]: "",
    publishDate: values ? values["publishDate"]: "",
    poster: values ? values["poster"]: "",
    trailer: values ? values["trailer"]: "",
    duration: values ? values["duration"]: "",
  }, validate);

  const onSubmit = (e) => {
    // errors
    handleSubmit(e);
    onSubmitting(errors);
  }

  const onChange = e => {
    handleChange(e);
    setDiable(false);
  }


  const onChangePoster = (fileArr) => {
    if (fileArr[0]) {
      let poster_input = document.querySelector(`#${action}_form_poster`);
      poster_input.value = fileArr[0].preview;
      setDiable(false);
      //setBlob(fileArr[0].buffer);
      setLinkPreview(fileArr[0].preview);
    }
  }

  const onChangeDate = (date) => {
    let public_date_input = document.querySelector(`#${action}_form_public_date`);
    public_date_input.value = date.toISOString();
    setCangePublishDate(date.toISOString());
    setDiable(false);
  }

  return(
    <form className='form' name={`movie_${action}_form`} id={`movie_${action}_form`} onSubmit={(e) => onSubmit(e)}>
      <input type="hidden" name="id" value={data.id} />
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_name`}>Name</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter name" name="name" id={`${action}_form_name`} value={data.name} onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.name && <span className="form__form-group-error">{errors.name}</span>}
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_public_date`}>Public Date</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="hidden" placeholder="enter public date" name="publishDate" id={`${action}_form_public_date`} value={changePublishDate}/>
            <CustomDatePicker dateInit={changePublishDate} onChangeDate={onChangeDate}  />
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <div className="label__group d-flex align-items-center">
          <label className="form__form-group-label" htmlFor={`${action}_form_poster`}>Link Poster</label>
          <a className="text-end link-info d-block my-2 flex-fill" target="_blank" href={linkPreview}  rel="noreferrer">
            Preview Link  
            <span className="mdi mdi-link mx-1 text-info"></span>
          </a>
        </div>
        
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter poster" name="poster" id={`${action}_form_poster`} value={ linkPreview } />
            {/* <input type="hidden" name="posterBlob" id={`${action}_form_poster_blob`} value={ blob }/> */}
            <CustomDropzone action={action} onChange={onChangePoster}/>
            {/* { errors.poster && <span className="form__form-group-error">{errors.poster}</span>} */}
          </div>
        </div>
      </div>

      <div className="form__form-group">
<<<<<<< HEAD
=======
        <label className="form__form-group-label" htmlFor={`${action}_form_description`}>Link description</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="hidden" placeholder="enter description" name="description" id={`${action}_form_description_input`} value={ description } />
            <textarea  text="text" id={`${action}_form_description`} onChange={(e) => onChangeDesc(e)} defaultValue={data.description} />
          </div>
        </div>
      </div>

      <div className="form__form-group">
>>>>>>> 182db25 (fix managerment movie & screening)
        <label className="form__form-group-label" htmlFor={`${action}_form_trailer`}>Link trailer</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter trailer" name="trailer" id={`${action}_form_trailer`} value={ data.trailer } onChange={(e) => onChange(e)} />
            
          </div>
        </div>
      </div>

      <div className="form__form-group">
        <label className="form__form-group-label" htmlFor={`${action}_form_duration`}>Duration</label>
        <div className="form__form-group-field">
          <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
            <input type="text" placeholder="enter duration" name="duration" id={`${action}_form_duration`} value={ data.duration } onChange={(e) => onChange(e)} onBlur={handleBlur}/>
            
            { errors.duration && <span className="form__form-group-error">{errors.duration}</span>}
          </div>
        </div>
      </div>
     
      <button type="submit" className={`form__button-toolbar btn w-100 d-block text-center btn-toolbar btn-primary ${disable ? 'disabled' : ''}`}>
          <span className="me-1">Submit</span>     
         {iconSummit}
      </button>
    </form>
  );
}

MovieForm.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    public_date: PropTypes.string,
    poster: PropTypes.string,
    duration: PropTypes.number,
  }),
  action: PropTypes.string,
  onSubmitting: PropTypes.func,
};

export default MovieForm;