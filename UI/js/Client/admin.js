const adminToken = localStorage.getItem('x-auth-token');
const userRole = localStorage.getItem('userRole');
const adminBaseUrl = '/api/v1/orders';
const mealsOrderdByUser = {};
let spinner = document.getElementById("spinner");
const allOrdersTable = document.querySelector('.allOrdersTable');
// console.log(allOrdersTable);
let appendTableItem = '';

spinner.style.display = "block";
/**
 * Modal role template
 */
const modalRow = ({ meal, meal_id, price, created_on, status, quantity }) => {
  return `
<tr class='tbg'>

<td data-label='orderid'>${meal_id}</td>
<td data-label='img'>
    <img class='imgt img-wd' src='./images/bg-img.jpg' alt='food'>
</td>
<td data-label='food'>${meal} </td>
<td data-label='quantity'>${quantity}</td>
<td data-label='cost'>N ${price}</td>
<td data-label='date'> ${created_on}</td>
<td data-label='status'>${status}</td>
</tr>`;
};

/**
 * Admin Order Template
 */
const allUserOrderTemplate = ({ order_id, cost, created_on, quantity }) => {
  return `
      <tr class='tbg'>
                              <!-- <td data-label='food'>
                                  <img class='imgt' src='./images/bg-img.jpg' alt='food' style='width:150px'>
                              </td> -->
                              <td data-label='orderid'>${order_id}</td>
                              <td data-label='items'>${quantity} item(s)
                                  <button data-orderId=${order_id} onclick=openModal(event) class='vw-btn'> View order(s)</button>
                              </td>
                              <td data-label='cost'>N ${cost}</td>
                              <td data-label='created_on'>${created_on}</td>
                              <td data-label='status'>
  
                                  <button id='myAcceptBtn' data-target='hiya' class='accept-button '>Accept</button>
                                  <button id='myDeclineBtn' class='end-button'>Decline</button>
                                  <button id='myConfirmBtn' class='comp-button'>Completed</button>
  
                              </td>
                          </tr>
      `;
};

/**
 * Fetch Api
 */
fetch(adminBaseUrl, {
  method: 'GET',
  headers: {
    'x-access-token': adminToken
  }
})
  .then(response => {
    if (!response.ok) {
      console.log('response not ok');
    }
    return response.json();
  })
  .then(getAllOrderResponse => {
    spinner.style.display = "none";
    console.log(getAllOrderResponse);
    let responseData = getAllOrderResponse.data.data;
    userOrderTableRow = responseData.map(userOrder => {
      // console.log('---->', userOrder.order_id);
      let userOrderedMeals = userOrder.mealitem;
      const { order_id, quantity, status } = userOrder;
      // console.log(order_id);

      mealsOrderdByUser[order_id] = userOrderedMeals.map(mealItem => {
        mealItem.quantity = quantity;
        mealItem.status = status;
        // console.log(mealItem);
        return mealItem;
      });
      return allUserOrderTemplate(userOrder);
    });
    // console.log(userOrderTableRow.join(''));
    appendTableItem += `
    <table >
                     <thead class='tbg'>
                        <tr>
                            <th>Order Id</th>
                            <th>Ordered item(s)</th>
                            <th>Total cost</th>
                            <th>Date Ordered</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        ${userOrderTableRow}
                    </tbody>
                </table>`;
    allOrdersTable.innerHTML = appendTableItem;
  });

// console.log(mealsOrderdByUser);

const openModal = e => {
  const buttonClicked = e.target;
  const clickedOrderId = buttonClicked.getAttribute('data-orderId');
  const mealItemForClickedOrder = mealsOrderdByUser[clickedOrderId];
  console.log(mealItemForClickedOrder);

  const arrayOfMealOrderTemplates = mealItemForClickedOrder.map(order =>
    modalRow(order)
  );
  document.querySelector(
    '#modal-body'
  ).innerHTML = arrayOfMealOrderTemplates.join('');
  // console.log(arrayOfMealOrderTemplates.join(''));
  const ordersModal = document.getElementById('ordersModal');
  ordersModal.style.display = 'block';
};
let ordersModal = document.getElementById('ordersModal');

const closeModal = event => {
  console.log('clicked');
  const ordersModal = document.getElementById('ordersModal');
  ordersModal.style.display = 'none';
};
