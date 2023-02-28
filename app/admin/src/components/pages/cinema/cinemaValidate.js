const availableTypes = ["TWOD","THREED","FOURDX"];
const displayType = availableTypes.join(", ");

export default function validate(values) {

  const {name, type, width, height, cinema_complex_id} = values;

  let errors = {};

  if(!name) {
    errors.name = "Name is required";
  }

  if(!type) {
    errors.type = "Type is required";
  }
  else if(!availableTypes.includes(values.type)) {
    errors.type = `Type must be required ${displayType}`;
  }

  if(!width) {
    errors.width = "Width is required";
  }
  else if(isNaN(width)) {
    errors.width = "Width must be a number";
  }
  else if(parseFloat(width) && width.toString().indexOf('.') !== -1) {
    errors.width = "Width must be an interger";
  }
  else if(parseInt(width) < 0) {
    errors.width = "Width must be an unsigned interger";
  }

  if(!height) {
    errors.height = "Height is required";
  }
  else if(isNaN(height)) {
    errors.height = "Height must be a number";
  }
  else if(parseFloat(height) && height.toString().indexOf('.') !== -1) {
    errors.height = "Height must be an interger";
  }
  else if(parseInt(height) < 0) {
    errors.height = "Height must be an unsigned interger";
  }

  if( cinema_complex_id === "-1") {
    errors.cinema_complex_id = "cinemaComplex is required";
  }

  return errors;
}