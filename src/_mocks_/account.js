// ----------------------------------------------------------------------


const account = {
  displayName: sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname"),
  email: sessionStorage.getItem("email"),
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

export default account;
