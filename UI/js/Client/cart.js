const userToken = localStorage.getItem('x-auth-token');

const logout = (e) => {
    console.log('yoo');
    localStorage.removeItem('x-auth-token')
    window.location = 'login.html';
}