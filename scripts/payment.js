
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
    //  decreasecart();
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
       //makeorder();
       paymentprocess();
   })
    
})
function makeorder(){
console.log(buyername);
console.log(buyerphone);
console.log(buyerlocation);
console.log(pickupdate,returndate)
console.log("product details",productdetals)
console.log("total price",cartprice)
// orderid=db.collection('orders').doc();
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
//userorder();
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
    //paymentprocess();
}

function paymentprocess(){
    orderid=db.collection('orders').doc();
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
            makeorder();
            userorder();
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
    propay.on('payment.failed', function (response){
        // alert("payment failed");
        makeorderfail(response);
    //    userorderfail();
       // savetodbfail(response);
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});
    propay.open();
}

//update success payement status in user db and orders db 
function savetodb(response){
    alert("payment completed");
    console.log(response)
    decreasecart();
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



//update failed payment status in user db and order db
function savetodbfail(response){
   // alert("payment failed");
    console.log("payment failled");
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).update({
        paymentstatus:"failed",
        paymentid:response.razorpay_payment_id,
        paymenterror: response.error.code,
        errordescription: response.error.description,
        reasonoffail:response.error.reason ,
            // orderid:orderid.id,
            // products:productdetals,
            // totalprice:cartprice,
            // pickupdate:pickupdate,
            // returndate:returndate,
            // buyername:buyername,
            // buyerphone:buyerphone,
            // buyerlocation:buyerlocation,


        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        paymentAt:firebase.firestore.FieldValue.serverTimestamp()
        
    }).then(()=>{
        console.log("updating user cart")
        return db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
            snap.docs.forEach(nap=>{
                console.log(nap.id)
                let idd=nap.id;
                db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(idd).delete();
            })
        })
    }).catch(err =>{ console.log(err)
       
    })
    updatepaymentstatusfail(response);
}
function updatepaymentstatusfail(response){
    console.log("updating payment stauts in orders ")
     db.collection('orders').doc(orderid.id).update({
        paymentstatus:"failed",
        paymentid:response.razorpay_payment_id,
        paymenterror: response.error.code,
        errordescription: response.error.description,
        reasonoffail:response.error.reason ,
        
        // orderid:orderid.id,
        // products:productdetals,
        // totalprice:cartprice,
        // pickupdate:pickupdate,
        // returndate:returndate,
        // buyername:buyername,
        // buyerphone:buyerphone,
        // buyerlocation:buyerlocation,
        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        paymentAt:firebase.firestore.FieldValue.serverTimestamp()
     })
     cartprice=0;
     document.querySelector('.payment-sections').style.display="none";
}

function makeorderfail(response){
    console.log(buyername);
    console.log(buyerphone);
    console.log(buyerlocation);
    console.log(pickupdate,returndate)
    console.log("product details",productdetals)
    console.log("total price",cartprice)
    // orderid=db.collection('orders').doc();
    db.collection('orders').doc(orderid.id).set({
        orderid:orderid.id,
        products:productdetals,
        totalprice:cartprice,
        pickupdate:pickupdate,
        returndate:returndate,
        buyername:buyername,
        buyerphone:buyerphone,
        buyerlocation:buyerlocation,
        paymentstatus:"failed",

      //  paymentid:response.razorpay_payment_id,
      paymenterror: `${response.error.code}`,
      errordescription: `${response.error.description}`,
      reasonoffail:`${response.error.reason}` ,
    
    }).then(()=>{
       // orderid=doc.id;
        // alert(`order id is ${orderid.id}`)
    })
    //userorder();
    userorderfail(response);
    }
    
    function userorderfail(response){
        cartprice=0;
        db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).set({
            orderid:orderid.id,
            products:productdetals,
            totalprice:cartprice,
            pickupdate:pickupdate,
            returndate:returndate,
            buyername:buyername,
            buyerphone:buyerphone,
            buyerlocation:buyerlocation,
            paymentstatus:"failed",

          //  paymentid:response.razorpay_payment_id,
            paymenterror: `${response.error.code}`,
            errordescription: `${response.error.description}`,
            reasonoffail:`${response.error.reason}` ,
        }).then(()=>{
            console.log("updating user cart")
            return db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
                snap.docs.forEach(nap=>{
                    console.log(nap.id)
                    let idd=nap.id;
                    db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(idd).delete();
                })
            })
        }).catch(err =>{ console.log(err)
           
        })
        document.querySelector('.payment-sections').style.display="none";
        //paymentprocess();
       // savetodbfail(response);
    }



// decrease cart
function decreasecart(){
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
        snap.docs.forEach(nap=>{
            console.log(nap.id)
            console.log(nap.data().qty)
            minuscart(nap.id,nap.data().qty)
        })
    })
}    