export default function validate(values) {
  let errors = {};
  const {price, cinema_complex_id, cinema_id, movie_id} = values;
 
  if(!price) {
    errors.price = "Price is required";
  }
  else if(isNaN(price)) {
    errors.price = "Price must be a number";
  }
  else if(parseFloat(price) && price.toString().indexOf('.') !== -1) {
    errors.price = "Price must be an interger";
  }
  else if(parseInt(price) < 0) {
    errors.price = "Price must be an unsigned interger";
  }

  if( cinema_complex_id === "-1") {
    errors.cinema_complex_id = "CinemaComplex is required";
  }

  if( cinema_id === "-1") {
    errors.cinema_id = "Cinema is required";
  }

  if( movie_id === "-1") {
    errors.movie_id = "Movie is required";
  }

  return errors;
}