let plus = document.getElementById("plus").value;
let minus = document.getElementById("subtract").value;
let defval = (document.getElementById("quant").innerHTML = "0");
let inp = document.getElementById("quant").value;
console.log(inp);
function plsbtn() {
  newinp = ++defval;
  document.getElementById("quant").innerHTML = newinp;
  console.log(newinp);
}

function subbtn() {
  //  document.getElementById("subtract").disabled = true;
  newinp = --defval;
  document.getElementById("quant").innerHTML = newinp;
  console.log(newinp);

  // let sign = Math.sign(newinp)
}
