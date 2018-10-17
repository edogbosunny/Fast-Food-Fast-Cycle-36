const token = localStorage.getItem('x-auth-token');
const gridContainer = document.querySelector('.gridcontainer');
const cartDivData = document.getElementById('cartTable');
let grandTotal = document.getElementById('grandTotal');
const baseURL = 'https://fast-food-fast-app.herokuapp.com/api/v1/menu';
let priceArr = [];
let cartArr = [];
let item = '';
let cartData = '';
let foodMenu;
let returnedMapData;
let foodUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnUqzH59_6q1KUqc7-w6arwNbw9MMrrswfFYVh3vE9aSpvw6q1';

const addbtn = id => {
  let value = document.getElementById(`quant${id}`).value;
  value = parseInt(value, 10);
  value += 1;
  document.getElementById(`quant${id}`).value = value;
};

// console.log('pppp==>', returnedMapData);
const subbtn = id => {
  let subtractValue = document.getElementById(`quant${id}`).value;
  console.log(subtractValue);
  subtractValue = parseInt(subtractValue, 10);
  if (subtractValue === 0) {
    return (subtractValue = 0);
  }
  subtractValue -= 1;
  document.getElementById(`quant${id}`).value = subtractValue;
};
const addtocart = (id, meal, price) => {
  //create table here...
  console.log(id, meal, price);
  priceArr.push(price);

  //calculate total amount
  let totalAmount = priceArr.reduce((a, b) => a + b, 0);

  grandTotal.innerHTML = totalAmount;
  cartArr.push({ id, meal, price });
  localStorage.setItem('shoppingCart', JSON.stringify(cartArr));

  console.log('localstorageCart-->', JSON.parse(localStorage.shoppingCart));
  cartData += `
  <tr>
     <td>
        ${meal}
            <span>
            <i class='fas fa-times del-cart'></i>
            </span>
        </td>
        <td class='price'>
    ${price}
    </td>
</tr>`;

  cartDivData.innerHTML = cartData;
};

if (token) {
  console.log('====>', 'token found');
  fetch(baseURL, {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log('error===> page not found');
      }
      return response.json();
    })
    .then(data => {
      foodMenu = data.data;
      //   console.log(data);
      foodMenu.forEach(returnedData => {
        console.log('0----->', returnedData);
        item += ` <div class='card griditem'>
          <img class='cardimg ' src='${foodUrl}' alt='logo '>
          <div>
              <h3 id='meal'>Name: ${returnedData.meal}</h3>
              <h4 id='price'>Price: ${returnedData.price}</h4>
          </div>
          <div class='cart-btn-mag'>
              <a class='btnaccept' id='addCart' 
              onclick='addtocart(${returnedData.meal_id}, ${JSON.stringify(
          returnedData.meal
        )}, ${returnedData.price})'>Add to Cart</a>
              <button id='sub' onclick='subbtn(${
                returnedData.meal_id
              })' class='btncomp'>-</button>
              <input type='text' id=quant${
                returnedData.meal_id
              } class='btncomp1' value='0'/>
              <button id='add' onclick='addbtn(${
                returnedData.meal_id
              })' class='btndeny'>+</button>
          </div>
      </div>`;
        gridContainer.innerHTML = item;
      });
    });
}
