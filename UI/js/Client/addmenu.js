addFoodMenuBaseURL = '/api/v1/menu';
adminMenuToken = localStorage.getItem('x-auth-token');
let mealFromForm;
let priceFromForm;
let submitButtonSpinner;
modalForm = '';
let Loadspinner = document.getElementById('spinner');
let modalFormBody = document.querySelector('#modalBody');
console.log(modalFormBody);

let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];

const submitForm = event => {
  event.preventDefault();
  Loadspinner.style.display = 'block';
  mealFromForm = document.querySelector('#meal').value;
  priceFromForm = document.querySelector('#foodPrice').value;
  console.log(priceFromForm);
  console.log('submit button has been clicked');
  submitButtonSpinner = document.querySelector('.btnSub');
  console.log(submitButtonSpinner);
  submitButtonSpinner.classList.add('fa-circle-o-notch');
  submitButtonSpinner.classList.add('fa');
  submitButtonSpinner.classList.add('fa-spin');

  fetch(addFoodMenuBaseURL, {
    method: 'POST',
    body: JSON.stringify({
      meal: mealFromForm,
      price: priceFromForm
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': adminMenuToken
    }
  })
    .then(response => {
      return response.json();
    })
    .then(menuResponse => {
      console.log(menuResponse);
      submitButtonSpinner.classList.remove('fa-circle-o-notch');
      submitButtonSpinner.classList.remove('fa');
      submitButtonSpinner.classList.remove('fa-spin');
    });
};

const modalBody = () => {
  modal.style.display = 'block';

  modalForm = `
    <form>
<div class='divwidth'>
    <div>
        <input class='txtwidth form-style-1' type='text' id='meal' name='mealName' placeholder='Meal Name' />

    </div>
    <div>
        <input type='text' class='txtwidth form-style-1' id= 'foodPrice' name='foodPrice' placeholder='Meal Price' />

    </div>
    <div>

        <input class='txtwidth form-style-1' type='file' name='upload' />

    </div>


    <div>
        <button id=''btnSpinner' class='buttonload ' onclick='submitForm(event)'> <i class=' btnSub fa fa-spin'></i>Submit </button>
    </div>

</div>

<div class='bm'>
</div>
</form>`;
  modalFormBody.innerHTML = modalForm;
};
span.onclick = function() {
  modal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

/**
 * Modal contents
 */
