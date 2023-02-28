import {useState} from 'react';
import validate from './screeningValidate';

const useForm = ({id, cinemaComplexId, cinemaId, movieId, startTime, endTime, price} ) => {
  const [data, setValue] = useState({
    id,
    cinemaComplexId,
    cinemaId,
    movieId,
    startTime,
    endTime,
    price,
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const {name, value} = e.target;
    setValue({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(data));
  }

  const handleBlur = e => {
    setErrors(validate(data));
  }

  return {data, handleChange, errors, handleSubmit, handleBlur};
}

export default useForm;