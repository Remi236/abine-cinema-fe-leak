import {useState} from 'react';
import validate from './movieValidate';

const useForm = ({id, name, publishDate, poster, trailer, duration} ) => {
  const [data, setValue] = useState({
    id,
    name,
    publishDate,
    poster,
    trailer,
    duration,
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