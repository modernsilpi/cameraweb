
//check out button
var buyername;
var buyerphone;
var buyerlocation;
var productdetals=[];
var pickupdate;
var returndate;
var orderid;
checkout=document.querySelector('#checkoutbtn')
checkout.addEventListener('click',(e)=>{
     e.preventDefault();
pickupdate=document.getElementById('pickupdate').value;
returndate=document.getElementById('returndate').value;
db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
    snap.docs.forEach(nap=>{
        productdetals.push(nap.data().name,nap.data().qty,nap.data().price,nap.data().link)
    })
})
    alert(`price is ${cartprice}`);
    // console.log(productdetals)
    // console.log(pickupdate,returndate);
    
   db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(snap=>{
       buyername=snap.data().name;
       buyerphone=snap.data().phone;
       buyerlocation=snap.data().location;
       makeorder();
   })
    
})
function makeorder(){
console.log(buyername);
console.log(buyerphone);
console.log(buyerlocation);
console.log(pickupdate,returndate)
console.log("product details",productdetals)
console.log("total price",cartprice)
orderid=db.collection('orders').doc();
db.collection('orders').doc(orderid.id).set({
    orderid:orderid.id,
    products:productdetals,
    totalprice:cartprice,
    pickupdate:pickupdate,
    returndate:returndate,
    buyername:buyername,
    buyerphone:buyerphone,
    buyerlocation:buyerlocation

}).then(()=>{
   // orderid=doc.id;
    // alert(`order id is ${orderid.id}`)
})
userorder();
}

function userorder(){
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).set({
        orderid:orderid.id,
        products:productdetals,
        totalprice:cartprice,
        pickupdate:pickupdate,
        returndate:returndate,
        buyername:buyername,
        buyerphone:buyerphone,
        buyerlocation:buyerlocation
    })
    paymentprocess();
}

function paymentprocess(){
    // alert("payment processing")
    // alert(orderid.id)
    var options = {
        "key": "rzp_test_EvIPsYYYs0Fsb3", // Enter the Key ID generated from the Dashboard
        "amount": `${cartprice*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "anoop cameras",
        "description": "best cameras in vizag",
        
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            savetodb(response)
        },
        "prefill": {
            "name": `${buyername}`,
            "contact": `${buyerphone}`,
            "order_id": `${orderid.id}`,
            "product details": `${productdetals}`
        },
        "notes": {
            "address": `${buyerlocation}`,
            "pickupdate": `${pickupdate}`,
            "returndate": `${returndate}`,
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
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).update({
        paymentstatus:"success",
        paymentid:response.razorpay_payment_id,
        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        paymentAt:firebase.firestore.FieldValue.serverTimestamp()
        
    }).then(()=>{
        return db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
            snap.docs.forEach(nap=>{
                console.log(nap.id)
                let idd=nap.id;
                db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(idd).delete();
            })
        })
    })
    updatepaymentstatus(response);
}
function updatepaymentstatus(response){
    console.log("updating payment stauts in orders ")
     db.collection('orders').doc(orderid.id).update({
        paymentstatus:"success",
        paymentid:response.razorpay_payment_id,
        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        paymentAt:firebase.firestore.FieldValue.serverTimestamp()
     })
     cartprice=0;
     document.querySelector('.payment-sections').style.display="none";
}