// Get the modal
var modal4 = document.getElementById('DelModal');
console.log(modal4)
// Get the button that opens the modal
var btn = document.getElementById("myDelBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("Delclose")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal4.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}