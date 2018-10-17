const baseUrl = 'https://fast-food-fast-app.herokuapp.com/api/v1/auth/login';
const submitBtn = document.querySelector('#submitbtn');
const loader = (document.getElementById('loader').style.display = 'none');
let uReg;
const signinUser = e => {
  e.preventDefault();
  document.getElementById('loader').style.display = 'block';
  const email = document.getElementById('email').value;
  let password = document.getElementById('pass').value;
  const emailErrMsg = document.getElementById('emailErrMsg');
  const passErrMsg = document.getElementById('pwdErrMsg');
  const signinErrMsg = document.getElementById('signinErrMsg');

  fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setTimeout(() => {
        if (data.status === true) {
          localStorage.setItem('x-auth-token', data.data.token);
          localStorage.setItem('userId', data.data.userId);
          localStorage.setItem('userRole', data.data.userRole);
          if (localStorage.userRole === admin) {
            window.location.replace('/admin.html');
          } else {
            window.location.replace('/index.html');
          }
        }
      }, 500);

      document.getElementById('loader').style.display = 'none';
      if (data.data.error === undefined) {
        if (data.data.message.length > 0) {
          emailErrMsg.innerHTML = '';
          passErrMsg.innerHTML = '';
        }
        uSignin = signinErrMsg.innerHTML = data.data.message;
        return data;
      }

      let mail = (emailErrMsg.innerHTML = data.data.error.email);
      let pass = (passErrMsg.innerHTML = data.data.error.password);
      if (mail === undefined) {
        emailErrMsg.innerHTML = '';
      }
      if (pass === undefined) {
        passErrMsg.innerHTML = '';
      }
    });
};
submitBtn.addEventListener('click', signinUser);
