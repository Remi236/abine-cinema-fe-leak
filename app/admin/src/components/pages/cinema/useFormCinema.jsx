import {useState} from 'react';
import validate from './cinemaValidate';

const useForm = ({id, name, type, width, height, cinemaComplexId} ) => {
  const [data, setValue] = useState({
    id,
    name,
    type,
    width,
    height,
    cinemaComplexId,
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