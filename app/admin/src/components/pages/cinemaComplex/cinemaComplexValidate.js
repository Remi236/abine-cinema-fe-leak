export default function validate(values) {
  let errors = {};
  
  if(!values.name) {
    errors.name = "Name is required";
  }
  if(!values.address) {
    errors.address = "Address is required";
  }

  return errors;
}