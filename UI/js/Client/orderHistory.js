let orderHistoryUrl = `/api/v1/users`;
let userId = localStorage.getItem('userId');
let token = localStorage.getItem('x-auth-token');
let orderHistoryTable = document.getElementById('orderHistoryTable');
let item = '';
const modal8 = document.getElementById('ordersUserCompModal');
const btn = document.getElementById('myOrderUserCompBtn');
const span = document.getElementsByClassName('closeUserOrder')[0];
const orderedMealsByUsers = {};
// //console.log(orderedMealsByUsers);

/**
 * userOrderTemplate
 */
const userOrderTemplate = ({
  order_id,
  cost,
  status,
  created_on,
  quantity
}) => {
  return `
    <tr data-id='${order_id}' class='tbg'>
        <!-- <td data-label='food'>
            <img class='imgt' src='./images/bg-img.jpg' alt='food' style='width:150px'>
        </td> -->
        <td data-label='orderid'>${order_id}</td>
        <td data-label='items'>${quantity} item(s)
            <button data-orderId='${order_id}' onclick=openModal(event) id=button${order_id} class='vw-btn'> View order(s)</button>
        </td>
        <td data-label='cost'>${cost}</td>
        <td data-label='Amount'>${created_on}</td>
        <td data-label='status'>${status}</td>
    </tr>
    `;
};

const logout = () => {
  localStorage.removeItem('x-auth-token');
  window.location = 'login.html';
}
/**
 * Modal Template
 */

const modalRow = mealitem => {
  const { meal, meal_id, price, created_on, status, quantity } = mealitem;
  return `
    <tr class='tbg'>

    <td data-label='orderid'>${meal_id}</td>
    <td data-label='img'>
        <img class='imgt img-wd' src='./images/bg-img.jpg' alt='food'>
    </td>
    <td data-label='food'>${meal} </td>
    <td data-label='quantity'>${quantity}</td>
    <td data-label='cost'>${price}</td>
    <td data-label='Amount'>${created_on}</td>
    <td data-label='status'>${status}</td>
</tr>`;
};

fetch(`${orderHistoryUrl}/${userId}/orders`, {
  method: 'GET',
  headers: {
    'x-access-token': token
  }
})
  .then(response => {
    if (!response.ok) {
      //console.log('error===> page not found');
    }
    return response.json();
  })
  .then(restaurantOrders => {
    console.log(restaurantOrders);
    let ordersData = restaurantOrders.data.mealItem;
    const rows = ordersData.map(userOrder => {
      const userOrderedMeals = JSON.parse(userOrder.mealitem);
      const { order_id, quantity, status } = userOrder;
      orderedMealsByUsers[order_id] = userOrderedMeals.map(mealItem => {
        mealItem.quantity = quantity;
        mealItem.status = status;
        return mealItem;
      });
      console.log(userOrderedMeals);
      return userOrderTemplate(userOrder);
    });
    item += `
    <table>
    <thead class='tbg'>
        <tr>
            <th>Order-Id</th>
            <th>Ordered item(s)</th>
            <th>Total cost</th>
            <th>Date Ordered</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        ${rows}
    </tbody>
    </table>
    </div>
    </div>
    </div>
    `;
    orderHistoryTable.innerHTML = item;
  });
const openModal = e => {
  const buttonClicked = e.target;
  const clickedOrderId = buttonClicked.getAttribute('data-orderId');
  const mealItemsForClikedOrder = orderedMealsByUsers[clickedOrderId];
  //console.log(mealItemsForClikedOrder);
  const arrayOfMealItemTemplates = mealItemsForClikedOrder.map(meal =>
    modalRow(meal)
  );
  document.querySelector(
    '#modal-body'
  ).innerHTML = arrayOfMealItemTemplates.join('');
  var modal8 = document.getElementById('ordersUserCompModal');
  modal8.style.display = 'block';
};
const closeModal = event => {
  var modal8 = document.getElementById('ordersUserCompModal');
  modal8.style.display = 'none';
};
