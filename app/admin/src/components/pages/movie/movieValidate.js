// const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
// const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export default function validate(values) {
  let errors = {};
  const {name, duration} = values;
  if(!name) {
    errors.name = "Name is required";
  }
  
  // if(!poster) {
  //   errors.poster = "Poster is required";
  // }
  // else if(!urlRegex.test(poster)) {
  //   errors.poster = "Poster is not a url";
  // }
  // if(!poster) {
  //   errors.poster = "Poster is required";
  // }
  // else if(!urlRegex.test(poster)) {
  //   errors.poster = "Poster is not a url";
  // }
  
  // if(!trailer) {
  //   errors.trailer = "Trailer is required";
  // }
  // else if(!urlRegex.test(trailer)) {
  //   errors.trailer = "Trailer url is invalid";
  // }

  if(!duration) {
    errors.duration = "Duration is required";
  }
  else if(isNaN(duration)) {
    errors.duration = "Duration must be a number";
  }
  else if(parseFloat(duration) && duration.toString().indexOf('.') !== -1) {
    errors.duration = "Duration must be an interger";
  }
  else if(parseInt(duration) < 0) {
    errors.duration = "Duration must be an unsigned interger";
  }
  return errors;
}