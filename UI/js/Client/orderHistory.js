let orderHistoryUrl = `/api/v1/users`
let userId = localStorage.getItem('userId')
let token = localStorage.getItem('x-auth-token')
console.log(userId);

fetch(`${orderHistoryUrl}/${userId}/orders`,{
    method: 'GET',
    headers: {
        'x-access-token': token
    }
}).then((response) =>{
    if (!response.ok) {
        console.log('error===> page not found');
      }
    return response.json();
}).then((returnedData) => {
    console.log('-->', returnedData);
})