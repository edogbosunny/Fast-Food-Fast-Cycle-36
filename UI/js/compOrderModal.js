// Get the modal
var modal6 = document.getElementById('ordersCompModal');

// Get the button that opens the modal
var btn = document.getElementById("myOrderCompBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeCompOrder")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal6.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal6.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
}