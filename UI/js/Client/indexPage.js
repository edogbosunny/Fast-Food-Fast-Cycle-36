const token = localStorage.getItem('x-auth-token');
const gridContainer = document.querySelector('.gridcontainer');
const cartDivData = document.getElementById('cartTable');
let grandTotal = document.getElementById('grandTotal');
let spinner = document.getElementById('spinner');
// console.log(spinner)
const baseURL = 'https://fast-food-fast-app.herokuapp.com/api/v1/menu';
let priceArr = [];
let cachedPriceArr = [];
let cachedDeletedPriceArr = [];
let orderedMealsByUsers;
let getAddToCartIdFromHtml;
let cartArr = JSON.parse(localStorage.getItem('shoppingCart')) || [];
// //console.log('cartArr-->', cartArr);
let item = '';
let cartData = '';
let foodMenu;
let returnedMapData;
let foodUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnUqzH59_6q1KUqc7-w6arwNbw9MMrrswfFYVh3vE9aSpvw6q1';
spinner.style.display = 'block';
const addbtn = id => {
  let value = document.getElementById(`quant${id}`).value;
  value = parseInt(value, 10);
  value += 1;
  document.getElementById(`quant${id}`).value = value;
};

// //console.log('pppp==>', returnedMapData);
const subbtn = id => {
  let subtractValue = document.getElementById(`quant${id}`).value;
  //console.log(subtractValue);
  subtractValue = parseInt(subtractValue, 10);
  if (subtractValue === 0) {
    return (subtractValue = 0);
  }
  subtractValue -= 1;
  document.getElementById(`quant${id}`).value = subtractValue;
};

const deleteOrder = e => {
  const deleteButtonClicked = e.target;
  const clickedOrderId = deleteButtonClicked.getAttribute('data-id');
  let clickedOrderIdInt = parseInt(clickedOrderId);
  //console.log(clickedOrderIdInt);
  // //console.log(cartArr)
  orderedMealsByUsers = cartArr.filter(ordersToDel => {
    let mealOrderFilterResp = ordersToDel.id !== clickedOrderIdInt;
    return mealOrderFilterResp;
  });
  localStorage.setItem('shoppingCart', JSON.stringify(orderedMealsByUsers));
  cartArr = orderedMealsByUsers;
  //console.log('======>', cartArr);
  const userOrderTable = cartArr.map(userOrderTableResp => {
    const { id, meal, updatedCartOrderPrice } = userOrderTableResp;
    cachedDeletedPriceArr.push(updatedCartOrderPrice);
    let cachedDeletedTotalAmount = cachedDeletedPriceArr.reduce(
      (a, b) => a + b,
      0
    );
    grandTotal.innerHTML = cachedDeletedTotalAmount;
    //console.log('---price', cachedDeletedPriceArr);
    return (cartData = `
  <tr>
     <td>
        ${meal}
            <span>
            <i data-id='${id}' onclick=deleteOrder(event) class='fas fa-times del-cart'></i>
            </span>
        </td>
        <td class='price'>
    ${updatedCartOrderPrice}
    </td>
</tr>`);
  });
  cartDivData.innerHTML = userOrderTable;
  // loopthrouh and append another meal
  //console.log('cachedarr->', cartArr);
};

const userOrderTable = cartArr.map(userOrderTableResp => {
  const { id, meal, updatedCartOrderPrice } = userOrderTableResp;
  cachedPriceArr.push(updatedCartOrderPrice);
  let cachedTotalAmount = cachedPriceArr.reduce((a, b) => a + b, 0);
  grandTotal.innerHTML = cachedTotalAmount;
  //console.log('---price', cachedTotalAmount);
  return (cartData = `
  <tr>
     <td>
        ${meal}
            <span>
            <i data-id='${id}' onclick=deleteOrder(event) class='fas fa-times del-cart'></i>
            </span>
        </td>
        <td class='price'>
    ${updatedCartOrderPrice}
    </td>
</tr>`);
});
cartDivData.innerHTML = userOrderTable;

const addtocart = (id, meal, price) => {
  getAddToCartIdFromHtml = document.getElementById(`addToCart${id}`);
  //disable button component on click not working
  const cartOrderQuantity = document.querySelector(`#quant${id}`).value;
  let updatedCartOrderPrice = price * cartOrderQuantity;
  console.log('cArray', cartArr);
  cachedPriceArr.push(updatedCartOrderPrice);
  let totalAmount = cachedPriceArr.reduce((a, b) => a + b, 0);
  grandTotal.innerHTML = totalAmount;
  cartArr.push({ id, meal, updatedCartOrderPrice, cartOrderQuantity });
  localStorage.setItem('shoppingCart', JSON.stringify(cartArr));
  let localStorageCart = JSON.parse(localStorage.shoppingCart);
  //console.log('localstorageCart-->', localStorageCart);
  const newUserOrderTable = cartArr.map(userOrderTableResp => {
    return (cartData = `
     <tr>
        <td>
           ${userOrderTableResp.meal}
           <span>
               <i data-id='${id}' onclick=deleteOrder(event) class='fas fa-times del-cart'></i>
               </span>
           </td>
           <td class='price'>
       ${userOrderTableResp.updatedCartOrderPrice}
       </td>
   </tr>`);
  });
  // //console.log('pppp-->', newUserOrderTable);
  cartDivData.innerHTML = newUserOrderTable;
  //create table here...
  //console.log(id, meal, price);
};

if (token) {
  //console.log('====>', 'token found');
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
      spinner.style.display = 'none';
      foodMenu = data.data;
      //   //console.log(data);
      foodMenu.forEach(returnedData => {
        console.log('0----->', returnedData);
        item += ` <div class='card griditem'>
          <img class='cardimg ' src='${foodUrl}' alt='logo '>
          <div>
              <h3 id='meal'>Name: ${returnedData.meal}</h3>
              <h4 id='price'>Price: ${returnedData.price}</h4>
          </div>
          <div class='cart-btn-mag'>
              <a class='btnaccept' id='addToCart${returnedData.meal_id}' 
              onclick='addtocart(${returnedData.meal_id}, ${JSON.stringify(
          returnedData.meal
        )}, ${returnedData.price})'>Add to Cart</a>
              <button id='sub' onclick='subbtn(${
                returnedData.meal_id
              })' class='btncomp'>-</button>
              <input type='text' id=quant${
                returnedData.meal_id
              } class='btncomp1' value='1'/>
              <button id='add' onclick='addbtn(${
                returnedData.meal_id
              })' class='btndeny'>+</button>
          </div>
      </div>`;
        gridContainer.innerHTML = item;
      });
    });
}
