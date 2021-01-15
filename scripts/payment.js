const promoerror=document.querySelector('.promoerror');

//check out price
totoalcheckout=document.querySelector('.totoalcheckout')
discount=document.querySelector('.discount')
//check out button
var buyername;
var buyerphone;
var buyerlocation;
var productdetals=[];
var pickupdate;
var returndate;
var orderid;
var cartprice2;
var donepayment=0;
checkout=document.querySelector('#checkoutbtn')
checkout.addEventListener('click',(e)=>{
      e.preventDefault();
donepayment=0;
    //  decreasecart();
    //check weather promo added or not
    if(promocodestatus==0){
        promocartprice=cartprice2;
    }
pickupdate=document.getElementById('pickupdate').value;
returndate=document.getElementById('returndate').value;

// if(! document.getElementById('checkboxt').checked) { 
//     // alert("ok");
//   //
// //  alert('Please check terms&conditions');
//     promoerror.style.display="block"
//     setTimeout(function(){
//       promoerror.style.display="none";
//     }, 5000);
//     promoerror.innerHTML="Please check terms&conditions";
//   }

if(!pickupdate || !returndate || ! document.getElementById('checkboxt').checked){
    promoerror.style.display="block"
    setTimeout(function(){
      promoerror.style.display="none";
    }, 5000);
    if(! document.getElementById('checkboxt').checked) promoerror.innerHTML="Please check terms&conditions";
    else promoerror.innerHTML="Please add pickup & return dates";

    }

else{
    
//change cart price according to the dates booked

// var pricedate=Number(returndate.slice(-2))-Number(pickupdate.slice(-2))+1;
// console.log(pricedate)
// promocartprice=promocartprice*pricedate
// promocartprice=cartprice2;
var li22;
li22=`
<p class="text-center totalCart">Totalcart: &#8377 ${cartprice2}</p>`;
carttotal.innerHTML=li22;
totoalcheckout.innerHTML=`<p><b>Total: &#8377 ${promocartprice}</b></p>`;
//end of logic
productdetals=[];
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
     
       paymentprocess();
   })
}
    
})
function makeorder(){

db.collection('orders').doc(orderid.id).set({
    orderid:orderid.id,
    products:productdetals,
    totalprice:promocartprice,
    pickupdate:pickupdate,
    returndate:returndate,
    buyername:buyername,
    buyerphone:buyerphone,
    buyerlocation:buyerlocation,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()

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
        buyerlocation:buyerlocation,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
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

            console.log("donepayment is ",donepayment);
            promocodeineligible();
            decreasecart();
            makeorder();
            userorder();
            savetodb(response);
            updatepaymentstatus(response);
            // deleteusercart();
           resetall();
          
            
           

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
function resetall(){
    homecart.value='';
    carttotal.value='';
    startdate.value='';
    enddate.value='';
    document.getElementById('checkboxt').value='';
    
}
// if(donepayment==1){location.reload(); donepayment=0;}
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
     }).then(()=>{
        cartprice=0;
        document.querySelector('.payment-sections').style.display="none";
        location.reload();
     })


}
function promocodeineligible(){
    if(promocodestatus==1){
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).update({
        promocode:"ineligible"
    })
}
}




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
donepayment=1;
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

                    //    if(cartprice2 >= cap.data().cutoff){
                        
                        if(cap.data().type=="percentage"){
                          let offer=(cap.data().off)/100;
                          offer=offer*cartprice2;
                          if(offer>cap.data().cutoff)offer=cap.data().cutoff;
                          promocartprice=Math.round(cartprice2-offer);
                          console.log("offer price is ",promocartprice)
                          promocodestatus=1;
                          coupencode=cap.data().promocode;

                          var li22;
                          li22=`
                          <p class="text-center totalCart">Totalcart: &#8377 ${cartprice2}</p>
                          `;

                          carttotal.innerHTML=li22;

                          discount.innerHTML=`<p>Discount: &#8377 ${offer}</p>`;
                          totoalcheckout.innerHTML=`<p><b>Total: &#8377 ${promocartprice}</b></p>`;
                          promoerror.innerHTML="Promo added successfully"
            
                        }
                        else if(cap.data().type=="price"){
            
                            promocartprice=Math.round(cartprice2-cap.data().off);
                            console.log("offer price is ",promocartprice)
                            promocodestatus=1;
                            coupencode=cap.data().promocode;
                            var li22;
                            li22=`
                            <p class="text-center totalCart">Totalcart: &#8377 ${cartprice2}</p>
                            `;
                            carttotal.innerHTML=li22;
                            discount.innerHTML=`<p>Discount: &#8377 ${cap.data().off}</p>`;
                            totoalcheckout.innerHTML=`<p><b>Total: &#8377 ${promocartprice}</b></p>`;
                            promoerror.innerHTML="Promo added successfully"
                            
                        }
                    // }
                    // else { 
                    //     console.log("price must be more then",cap.data().cutoff)
                    //     promoerror.innerHTML=`cartprice morethen &#8377 ${cap.data().cutoff}`
                    
                    // }
                   
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

function daydiff(pickupdate,returndate){
    const date1 = new Date(pickupdate);
const date2 = new Date(returndate);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffTime + " milliseconds");
console.log(diffDays + " days");
return diffDays
}

const enddate=document.getElementById('returndate')
enddate.addEventListener('change',(e)=>{
const    pickupdate=document.getElementById('pickupdate').value;
const returndate=document.getElementById('returndate').value;
    console.log("end date updated");
    //change cart price according to the dates booked

// var pricedate=Number(returndate.slice(-2))-Number(pickupdate.slice(-2))+1;
var pricedate=daydiff(pickupdate,returndate)
pricedate=pricedate+1;

console.log(pricedate);
cartprice2=cartprice;
cartprice2=cartprice2*pricedate
var li22;
li22=`
<p class="text-center totalCart">Totalcart: &#8377 ${cartprice2}</p>
`;
carttotal.innerHTML=li22;
//end of logic
// enddate.value='';
})

const startdate=document.getElementById('pickupdate')
startdate.addEventListener('change',(e)=>{
    console.log(startdate.value);
    document.getElementById('returndate').setAttribute("min",startdate.value);
})