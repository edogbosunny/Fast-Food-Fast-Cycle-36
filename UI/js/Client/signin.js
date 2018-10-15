const baseUrl = 'https://fast-food-fast-app.herokuapp.com/api/v1/auth/login';
// const signUpForm = document.querySelector('.signup');
const submitBtn = document.querySelector('#submitbtn');
const loader = (document.getElementById('loader').style.display = 'none');
// console.log('----->', loader);

let uReg;

const signinUser = e => {
  e.preventDefault();
  document.getElementById('loader').style.display = 'block';
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
//   console.log(pwd)
  const emailErrMsg = document.getElementById('emailErrMsg');
  const passErrMsg = document.getElementById('pwdErrMsg');
  const signinErrMsg = document.getElementById('signinErrMsg');


  fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      pass,
        email,
      
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
            console.log(data);
          if (data.status === true) {
            localStorage.setItem('x-auth-token', data.data.token);
            // window.location.replace('/index.html');
          }
            //   console.log('ooosoossosoos')
        }, 500);

      document.getElementById('loader').style.display = 'none';
      if (data.data.error === undefined) {
        console.log(data);
        console.log('=====>', data.data.message);
        uSignin = signinErrMsg.innerHTML = data.data.message;
        return data;
      }

      let mail = (emailErrMsg.innerHTML = data.data.error.email);
      let pass = (passErrMsg.innerHTML = data.data.error.password);
      // console.log('=====> ', uReg);
      if (mail === undefined) {
        emailErrMsg.innerHTML = '';
      }
      if (pass === undefined) {
        passErrMsg.innerHTML = '';
      }
 
    });
};
submitBtn.addEventListener('click', signinUser);
