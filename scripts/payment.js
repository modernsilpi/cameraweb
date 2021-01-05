const promoerror=document.querySelector('.promoerror');
//check out button
var buyername;
var buyerphone;
var buyerlocation;
var productdetals=[];
var pickupdate;
var returndate;
var orderid;
var donepayment=0;
checkout=document.querySelector('#checkoutbtn')
checkout.addEventListener('click',(e)=>{
      e.preventDefault();

    //  decreasecart();
    //check weather promo added or not
    if(promocodestatus==0){
        promocartprice=cartprice;
    }
pickupdate=document.getElementById('pickupdate').value;
returndate=document.getElementById('returndate').value;
if(!pickupdate || !returndate){
    promoerror.style.display="block"
    setTimeout(function(){
      promoerror.style.display="none";
    }, 5000);
    promoerror.innerHTML="Please add pickup & return dates";
    }
else{
    
//change cart price according to the dates booked
console.log(Number(returndate.slice(-2))-Number(pickupdate.slice(-2)))
var pricedate=Number(returndate.slice(-2))-Number(pickupdate.slice(-2))+1;
promocartprice=promocartprice*pricedate
var li22;
li22=`
<p class="text-center totalCart"><b>Totalcart:</b> ${promocartprice}</p>
`;
carttotal.innerHTML=li22;
//end of logic

db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
    snap.docs.forEach(nap=>{
        productdetals.push(nap.data().name,nap.data().qty,nap.data().price,nap.data().link,nap.data().productid)
    })
})
  //  alert(`price is ${promocartprice}`);
    // console.log(productdetals)
    // console.log(pickupdate,returndate);
    
   db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(snap=>{
       buyername=snap.data().name;
       buyerphone=snap.data().phone;
       buyerlocation=snap.data().location;
       //makeorder();
       paymentprocess();
   })
}
    
})
function makeorder(){
// console.log(buyername);
// console.log(buyerphone);
// console.log(buyerlocation);
// console.log(pickupdate,returndate)
// console.log("product details",productdetals)
// console.log("total price",promocartprice)
// orderid=db.collection('orders').doc();
db.collection('orders').doc(orderid.id).set({
    orderid:orderid.id,
    products:productdetals,
    totalprice:promocartprice,
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
        totalprice:promocartprice,
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
        "amount": `${promocartprice*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "anoop cameras",
        "description": "best cameras in vizag",
        
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
           // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            
            promocodeineligible()
            decreasecart();
            makeorder();
            userorder();
            savetodb(response)
            donepayment=1;
            updatepaymentstatus(response);
            deleteusercart();
           // location.reload();
            
           

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
    var propay= new Razorpay(options,(error,order)=>{
        if(error){
            console.log(error);
        } else {
            console.log(order);
        }
    });
//     propay.on('payment.failed', function (response){
//         // alert("payment failed");
//         makeorderfail(response);
//     //    userorderfail();
//        // savetodbfail(response);
//         // alert(response.error.code);
//         // alert(response.error.description);
//         // alert(response.error.source);
//         // alert(response.error.step);
//         // alert(response.error.reason);
//         // alert(response.error.metadata.order_id);
//         // alert(response.error.metadata.payment_id);
// });
    propay.open();
}

//update success payement status in user db and orders db 
function savetodb(response){
    console.log("payment completed");
    console.log(response)
   // decreasecart();
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).update({
        paymentstatus:"success",
        paymentid:response.razorpay_payment_id,
        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        promocode:coupencode,
        dateofpay:new Date().toDateString(),
        timeofpay:new Date().toTimeString(),
        month:new Date().getMonth(),
        send:0,recieve:0,ordercomplete:0,buyerid:firebase.auth().currentUser.uid

        
    }).then(()=>{
        return db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
            snap.docs.forEach(nap=>{
                console.log(nap.id)
                let idd=nap.id;
                db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(idd).delete();
            })
        })
    })
  //  updatepaymentstatus(response);
}
function updatepaymentstatus(response){
    console.log("updating payment stauts in orders ")
     db.collection('orders').doc(orderid.id).update({
        paymentstatus:"success",
        paymentid:response.razorpay_payment_id,
        // paymentorderid:response.razorpay_order_id,
        // paymentsignature:response.razorpay_signature,
        promocode:coupencode,
        dateofpay:new Date().toDateString(),
        timeofpay:new Date().toTimeString(),
        month:new Date().getMonth(),
        send:0,recieve:0,ordercomplete:0,buyerid:firebase.auth().currentUser.uid
     })
     cartprice=0;
     document.querySelector('.payment-sections').style.display="none";
    // promocodeineligible();
}
function promocodeineligible(){
    if(promocodestatus==1){
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).update({
        promocode:"ineligible"
    })
}
}



//update failed payment status in user db and order db
// function savetodbfail(response){
//    // alert("payment failed");
//     console.log("payment failled");
//     db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').doc(orderid.id).update({
//         paymentstatus:"failed",
//         paymentid:response.razorpay_payment_id,
//         paymenterror: response.error.code,
//         errordescription: response.error.description,
//         reasonoffail:response.error.reason ,
//             // orderid:orderid.id,
//             // products:productdetals,
//             // totalprice:cartprice,
//             // pickupdate:pickupdate,
//             // returndate:returndate,
//             // buyername:buyername,
//             // buyerphone:buyerphone,
//             // buyerlocation:buyerlocation,


//         // paymentorderid:response.razorpay_order_id,
//         // paymentsignature:response.razorpay_signature,
//         paymentAt:firebase.firestore.FieldValue.serverTimestamp()
        
//     }).then(()=>{
//         console.log("updating user cart")
//         return db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(snap=>{
//             snap.docs.forEach(nap=>{
//                 console.log(nap.id)
//                 let idd=nap.id;
//                 db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(idd).delete();
//             })
//         })
//     }).catch(err =>{ console.log(err)
       
//     })
//     updatepaymentstatusfail(response);
// }
// function updatepaymentstatusfail(response){
//     console.log("updating payment stauts in orders ")
//      db.collection('orders').doc(orderid.id).update({
//         paymentstatus:"failed",
//         paymentid:response.razorpay_payment_id,
//         paymenterror: response.error.code,
//         errordescription: response.error.description,
//         reasonoffail:response.error.reason ,
        
//         // orderid:orderid.id,
//         // products:productdetals,
//         // totalprice:cartprice,
//         // pickupdate:pickupdate,
//         // returndate:returndate,
//         // buyername:buyername,
//         // buyerphone:buyerphone,
//         // buyerlocation:buyerlocation,
//         // paymentorderid:response.razorpay_order_id,
//         // paymentsignature:response.razorpay_signature,
//         paymentAt:firebase.firestore.FieldValue.serverTimestamp()
//      })
//      cartprice=0;
//      document.querySelector('.payment-sections').style.display="none";
// }

function makeorderfail(response){
    // console.log(buyername);
    // console.log(buyerphone);
    // console.log(buyerlocation);
    // console.log(pickupdate,returndate)
    console.log("product details",productdetals)
    console.log("total price",promocartprice)
    // orderid=db.collection('orders').doc();
    db.collection('orders').doc(orderid.id).set({
        orderid:orderid.id,
        products:productdetals,
        totalprice:promocartprice,
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
            totalprice:promocartprice,
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
        })
        document.querySelector('.payment-sections').style.display="none";
        //paymentprocess();
       // savetodbfail(response);
    }




    
// decrease cart in the website 
var productid=[];
var qte=[];
function decreasecart(){

    console.log("donepayment")
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').get().then(snap=>{
        snap.docs.forEach(nap=>{
            console.log(nap.id)
             productid=nap.id;
             qte=nap.data().qty;
             
            minuscart(productid,qte);
        })
    })
  }
  function deleteusercart(){

    console.log("deleting cart")
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').get().then(snap=>{
        snap.docs.forEach(nap=>{
            console.log(nap.id)
            db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(nap.id).delete();
        })
    })

  }    


//promo code function
const promobtn=document.querySelector('#promobtn');
var promocartprice=0;
var promocodestatus=0;
var coupencode=0;
 document.querySelector('.promoerror').style.display="none"
promobtn.addEventListener('click',(e)=>{
   const promocode=document.querySelector('.promocodefield').value
//    const promoerror=document.querySelector('.promoerror')
   // console.log(promocode,"clicked");
    document.querySelector('.promoerror').style.display="block"
    setTimeout(function(){
    document.querySelector('.promoerror').style.display="none";
    }, 5000);
    
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).get().then(snap=>{
        // console.log(snap.data().promocode)
        if(snap.data().promocode=="eligible"){

            db.collection('promocodes').get().then(nap=>{
                nap.forEach(cap=>{
                   if(promocode==cap.data().promocode){
                       console.log("promocode added",cap.data().status)
                    if(cap.data().status=="active"){ 

                        if(cartprice >= cap.data().cutoff){
                        
                        if(cap.data().type=="percentage"){
                          let offer=(cap.data().off)/100;
                          promocartprice=Math.round(cartprice-(offer*cartprice));
                          console.log("offer price is ",promocartprice)
                          promocodestatus=1;
                          coupencode=cap.data().promocode;

                          var li22;
                          li22=`
                          <p class="text-center totalCart"><b>Totalcart:</b> ${promocartprice}</p>
                          `;
                          carttotal.innerHTML=li22;
                          promoerror.innerHTML="Promo added successfully"
            
                        }
                        else if(cap.data().type=="price"){
            
                            promocartprice=Math.round(cartprice-cap.data().off);
                            console.log("offer price is ",promocartprice)
                            promocodestatus=1;
                            coupencode=cap.data().promocode;
                            var li22;
                            li22=`
                            <p class="text-center totalCart"><b>Totalcart:</b> ${promocartprice}</p>
                            `;
                            carttotal.innerHTML=li22;
                            promoerror.innerHTML="Promo added successfully"
                            
                        }
                    }
                    else { 
                        console.log("price must be more then",cap.data().cutoff)
                        promoerror.innerHTML=`cartprice morethen ${cap.data().cutoff}`
                    
                    }
                   
                    }
                    else{
                        console.log("expired")
                        promoerror.innerHTML="Expired"
                    }
                   }
                   else{
                       console.log("not valid")
                   }
                })
                })

        }
        else{
            console.log("not eligible for this")
            promoerror.innerHTML="Not eligible for this promo"
        }
    })
    // db.collection('promocodes').get().then(nap=>{
    // nap.forEach(cap=>{
    //    if(promocode==cap.data().promocode){
    //        console.log("promocode added",cap.data().status)
    //     if(cap.data().status=="active"){ 
    //         console.log("eligle for promo")
    //         if(cap.data().type=="percentage"){
    //           let offer=(cap.data().off)/100;
    //           promocartprice=cartprice-(offer*cartprice);
    //           console.log("offer price is ",promocartprice)
    //           promocodestatus=1;

    //         }
    //         else if(cap.data().type=="price"){

    //             promocartprice=cartprice-cap.data().off
    //             console.log("offer price is ",promocartprice)
    //             promocodestatus=1;
                
    //         }
    //     }
    //     else{
    //         console.log("expired")
    //     }
    //    }
    //    else{
    //        console.log("not valid")
    //    }
    // })
    // })
})

