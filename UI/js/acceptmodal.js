// Get the modal
var modal1 = document.getElementById("myacceptModal");
console.log(modal1)
// Get the button that opens the modal
var btn = document.getElementById("myAcceptBtn");
console.log(btn.attributes[1]);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeAccept")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal1.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal1.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};
