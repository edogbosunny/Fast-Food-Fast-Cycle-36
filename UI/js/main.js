const plus = document.getElementById('plus').value;
const minus = document.getElementById('subtract').value;
let defval = (document.getElementById('quant').innerHTML);
const inp = document.getElementById('quant').value;
defval = '0';

console.log(inp);
function plsbtn() {
  newinp = defval + 1;
  document.getElementById('quant').innerHTML = newinp;
  console.log(newinp);
}

function subbtn() {
  //  document.getElementById("subtract").disabled = true;
  newinp = defval - 1;
  document.getElementById('quant').innerHTML = newinp;
  console.log(newinp);

  // let sign = Math.sign(newinp)
}
