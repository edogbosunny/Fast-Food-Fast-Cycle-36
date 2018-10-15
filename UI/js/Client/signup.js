const baseUrl = 'https://fast-food-fast-app.herokuapp.com/api/v1/auth/signup';
const signUpForm = document.querySelector('.signup');
const submitBtn = document.querySelector('.button2');
const loader = (document.getElementById('loader').style.display = 'none');
// console.log('----->', loader);
let uReg;

const signupUser = e => {
  e.preventDefault();
  document.getElementById('loader').style.display = 'block';
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
  const userRegErr = document.getElementById('userRegErr');
  console.log(userRegErr);

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
        setTimeout(() => {
            console.log(data.status);
          if (data.status === true) {
            localStorage.setItem('x-auth-token', data.data.token);
            window.location.replace('/index.html');
          }
            //   console.log('ooosoossosoos')
        }, 500);

      const loader = (document.getElementById('loader').style.display = 'none');
      if (data.data.errors === undefined) {
        console.log(data);
        console.log('=====>', data.data.message);
        uReg = userRegErr.innerHTML = data.data.message;
        return data;
      }

      let fName = (fNameErrMsg.innerHTML = data.data.errors.firstName);
      let lName = (lNameErrMsg.innerHTML = data.data.errors.lastName);
      let mail = (emailErrMsg.innerHTML = data.data.errors.email);
      let pass = (passErrMsg.innerHTML = data.data.errors.password);
      let cpass = (cPassErrMsg.innerHTML = data.data.errors.confirmPassword);
      // console.log('=====> ', uReg);

      if (uReg === undefined) {
        userRegErr.innerHTML = '';
      }
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
