const baseUrl = 'https://fast-food-fast-app.herokuapp.com/api/v1/auth/signup';
const signUpForm = document.querySelector('.signup');
const submitBtn = document.querySelector('.button2');

const signupUser = e => {
  e.preventDefault();
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const fNameErrMsg = document.getElementById('fNameErrMsg');
  const lNameErrMsg = document.getElementById('lNameErrMsg');
  const emailErrMsg = document.getElementById('emailErrMsg');
  const passErrMsg = document.getElementById('passErrMsg');
  const cPassErrMsg = document.getElementById('cPassErrMsg');

  fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      } = data.data.errors;
      console.log('------>', confirmPassword);
      let fName = (fNameErrMsg.innerHTML = firstName);
      let lName = (lNameErrMsg.innerHTML = lastName);
      let mail = (emailErrMsg.innerHTML = email);
      let pass = (passErrMsg.innerHTML = password);
      let cpass = (cPassErrMsg.innerHTML = confirmPassword);
      if (fName === undefined) {
        fNameErrMsg.innerHTML = '';
      }
      if (lName === undefined) {
        lNameErrMsg.innerHTML = '';
      }
      if (mail === undefined) {
        emailErrMsg.innerHTML = '';
      }
      if (pass === undefined) {
        passErrMsg.innerHTML = '';
      }

      if (cpass === undefined) {
        cPassErrMsg.innerHTML = '';
      }
      console.log(data);
    });
};
submitBtn.addEventListener('click', signupUser);
