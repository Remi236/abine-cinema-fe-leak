const validateToken = () => {
  let access_token = sessionStorage.getItem("access_token");
  if (!access_token) window.location.href = '/login';
}

const redirectToken = (token) => {
  sessionStorage.setItem("access_token", token);
  window.location.href = "/";
}

export {
  validateToken,
  redirectToken,
}