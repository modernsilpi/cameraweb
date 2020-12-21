// import { cartprice } from './index.js'

//check out button
var buyername;
var buyerphone;
var buyerlocation;
checkout=document.querySelector('#checkoutbtn')
checkout.addEventListener('click',(e)=>{
    e.preventDefault();
    alert(`price is ${cartprice}`);
    
   db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(snap=>{
       buyername=snap.data().name;
       buyerphone=snap.data().phone;
       buyerlocation=snap.data().location;
       paymentprocess();
   })
    
})

function paymentprocess(){
    alert("payment processing")
    var options = {
        "key": "rzp_test_EvIPsYYYs0Fsb3", // Enter the Key ID generated from the Dashboard
        "amount": `${cartprice*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "anoop cameras",
        "description": "best cameras in vizag",
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
            savetodb(response)
        },
        "prefill": {
            "name": `${buyername}`,
            "contact": `${buyerphone}`
        },
        "notes": {
            "address": `${buyerlocation}`
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var propay= new Razorpay(options);
    propay.open();
}
function savetodb(response){
    alert("payment completed");
    console.log(response)
}