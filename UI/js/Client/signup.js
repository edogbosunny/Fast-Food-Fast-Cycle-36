const baseUrl = 'https://fast-food-fast-app.herokuapp.com/api/v1/auth/signup';
const signUpForm = document.querySelector('.signup');
const submitBtn = document.querySelector('.button2');

const signupUser = (e) =>{
    e.preventDefault();
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;



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
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}
submitBtn.addEventListener('click', signupUser);