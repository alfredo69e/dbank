import { dbank_backend } from "../../declarations/dbank_backend";


window.addEventListener("load", async () => {
  
  _updateCurrentAmount();
});

document.querySelector("form").addEventListener("submit", async ( event ) => {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value) ;
  const outoutAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if ( document.getElementById("input-amount").value.length != 0) {
    
    await dbank_backend.topUp( inputAmount );
  } 
  
  if ( document.getElementById("withdrawal-amount").value.length != 0 ){
    await dbank_backend.withDrawl( outoutAmount );
  }

  _updateCurrentAmount();
  
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");


});

 const _updateCurrentAmount = async () => {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round( currentAmount * 100 ) / 100;
 };