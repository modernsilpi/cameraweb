var mainuser;
var mainusercond=0;
const loginli=document.querySelector('.loginli');
const registerli=document.querySelector('.registerli');
const logoutli=document.querySelector('.logoutli');
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     document.querySelector('.usercart').style.display="block"
     
     //visible only logout when user logged in
     loginli.style.display="none";
     registerli.style.display="none";
     logoutli.style.display="block";
     mainuser=user
     mainusercond=1;
    } else {
     console.log("user not login")
     //visiable register and login button when user not login 
     loginli.style.display="block";
     registerli.style.display="block";
     logoutli.style.display="none";
    }
  });

  //show registration form when clicked on "register"
  const register=document.querySelector('.register');
  register.addEventListener('click',(e)=>{
    console.log("register clicked")
    document.querySelector('.back-layer').style.display="block";
  })

  //show login form when clicked on "login"
  const loginbut=document.querySelector('.loginbut');
  loginbut.addEventListener('click',(e)=>{
    console.log("login clicked")
    document.querySelector('.back-layer2').style.display="block";
  })

  //show shopping cart when clicked on "cart"
  const logincart=document.querySelector('.usercart')
  logincart.addEventListener('click',(e)=>{

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       document.querySelector('.payment-sections').style.display="block";
      //  db.collection('users').doc(user.uid).collection('cart').onSnapshot(pap=>{
      //   let changes=pap.docChanges();
      //   changes.forEach(change => {
      //       if(change.type=='added'){
      //           indexcart(change.doc);
      //       } else if(change.type=='removed'){
      //           let div=homecart.querySelector('[id=' + change.doc.id + ']');
      //           homecart.removeChild(div);
      //       } else if(change.type=='modified'){
      //           let div=homecart.querySelector('[id=' + change.doc.id + ']');
      //           homecart.removeChild(div);
      //           indexcart(change.doc);
      //       }
           
      //   })
      // })


       
      } else {
       console.log("user not login")
       alert("please login or register to view cart")

      }
    });
  

  })

const block=document.querySelector('.carousel-inner');
const indicators = document.querySelector('.carousel-indicators');
const turnon=document.querySelector('.turnon');
const categoryButtons = document.querySelector('.buttons-container');

let unique=document.querySelector('.unique')
var sendid;
var rentstate;
var maincategory;


  if(categoryButtons){
categoryButtons.addEventListener("click", e=>{
unique.innerHTML='';
   console.log("clicked")
  const target=e.target.closest('.camerabutton');
  if (!target){console.log("problem1"); return};
  const id = target.dataset.id;
   console.log(id)
   sendid= id;
   maincategory=id
  database2(id);

  
},true)

  }

if(categoryButtons){
  categoryButtons.addEventListener("click", e =>{
    const target=e.target.closest('.camcut')
    if (!target) return;
    const id = target.dataset.id;
     console.log(id)
     
    database(sendid,id);
  })
  
  
  } 
function uniquefeed2(data){ //only subcategory function here
  console.log("uniquefeed2")
  let html='';
  var li;
  data.forEach(cam=>{
    li=`          <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${cam.data().link}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${cam.data().name}</h5>
          <p class="card-text">${cam.data().price}</p>
          <a href="#" class="btn btn-light rentit" id="${cam.id}">book</a>
        </div>
      </div>
  </div>
    `
    html+=li;
    unique.innerHTML=html

  
  })
  const rent =document.querySelectorAll('.rentit');
 // const paymentSections = document.querySelector('.payment-sections');
  rent.forEach(rant=>{
    rant.addEventListener('click',e=>{
      cartprice=0;
      console.log("rented")
    //  paymentSections.style.display = "block";
    //  rant.setAttribute('href', "#payment-sections1");
    document.querySelector('.payment-sections').style.display="block";
      var ids =e.target.getAttribute('id')
      console.log(ids)
    //  search2(ids)// this is for add product to user cart db
      // usercart();
    //  search(maincategory,ids);
    advancedsearch(ids)
    })
  })
  $(".rentit").on("click",function(){
    console.log("renteddd")
  });

}

function uniquefeed3(data){ // this function for append all products including subcategories
  console.log("feed",data)
  console.log("uniquefeed3")
 
  let html='';
  var li;
data.forEach(nup=>{
  console.log(nup);

   nup.forEach(cam=>{

    console.log("id",cam.id)
    li=`  
    <div class="marginCard"> 
    <div class="col-lg-3 col-md-4 col-sm-6">  
    <div class="card" style="width: 18rem;" id="${cam.id}">
        <img class="card-img-top" src="${cam.data().link}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" >${cam.data().name}</h5>
          <div class="rate-qty">
          <p class="card-text">Qty: ${cam.data().qty}</p>
          <p class="card-text">&#8377; ${cam.data().price}</p>
          </div>
          <a href="#" class="btn btn-dark rentit" id="${cam.id}"><b>Book</b></a>
        </div>
        </div>
        </div>
  </div>
    `
    html+=li;
    unique.innerHTML=html
   // unique.appendChild(div)
  // console.log(cam.data().name)
  })
  
})
const rent =document.querySelectorAll('.rentit');
//const paymentSections = document.querySelector('.payment-sections');
rent.forEach(rant=>{
  rant.addEventListener('click',e=>{
    cartprice=0;
    console.log("rented")
  //  paymentSections.style.display = "block";
   
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       rant.setAttribute('href', "#payment-sections1");
       document.querySelector('.usercart').style.display="block"
    document.querySelector('.payment-sections').style.display="block";
    var ids =e.target.parentElement.parentElement.getAttribute('id')
    console.log(ids)
   advancedsearch(ids);
      }
      else{
        alert("please login to buy")
        console.log("please login to buy")
        document.querySelector('.back-layer').style.display="block"
      }
    })
  })
})
}


function setupguides(data){
    let html='';
    let html2 = '';
    

for(var i=0;i<data.length;i++){ 
    var li;
    var li2;
    if (i == 0){
  li=   `
 <div class="carousel-item active">
                    <img class="d-block w-100" src="${data[i]}" alt="Third slide">
                  </div>`
    li2 = `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;

    } else {
         li=   `
 <div class="carousel-item">
                    <img class="d-block w-100" src="${data[i]}" alt="Third slide">
                  </div>
    `
    li2 = `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;

    }
    html2 += li2;
    html+=li;
    indicators.innerHTML = html2
    block.innerHTML=html
    }
}

function setupguides2(id,data){

  
    let catButtons = '';
var buttons;
    for (var i=0; i<id.length; i++) {
        //  buttons = `<button class="btn btn-dark">${dataa[i]}</button>
        //  `
        buttons = `<div class="btn-group"><h1 class="btn btn-dark camerabutton"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="${id[i]}">${id[i]}</h1>
          <div class="dropdown-menu dropmenu rollnut cambut${id[i]}">
        </div></div>
        `
    


    catButtons += buttons;
  //  console.log(buttons)
    categoryButtons.innerHTML = catButtons
    }
   // console.log(data)
    for(i=0;i<id.length;i++){
      const cambut=document.querySelector(`.cambut${id[i]}`)
      let hmtl='';
      var ls;
      data.forEach(nup=>{
        console.log(nup)
     if(nup.id==`${id[i]}`){
      for (var name of Object.keys(nup.data())) {
        console.log(name)
        ls=`<a class="dropdown-item camcut" data-id="${name}">${name}</a>`;
        hmtl+=ls;
        cambut.innerHTML=hmtl;
      }
    }
    
    })
    }

   
}

const homecart=document.querySelector('.cart-table')
const carttotal=document.querySelector('.cart-total')

function indexcart(cartt){
  const div = document.createElement('div');
  var cart=cartt.data()
  console.log(cartt.id)
  
  let html='';
  var li;
  div.setAttribute('id', cartt.id);
  let totalcost=cart.price*cart.qty;
  li=`
  <div >
  <img src="${cart.link}" alt="">
</div>
     <div class="cart-text">
      <p>
      ${cart.name}
      </p>
     </div>
    
     <div class="control">
      <p class="cart-quantity decreaseqty pl-mi" id="d${cartt.id}"><span class="material-icons">
      remove_circle
      </span></p>
      <span class="count-span">${cart.qty}</span>
      <p  class="cart-quantity increaseqty pl-mi" id="i${cartt.id}"><span class="material-icons">
      add_circle
      </span></p>
    </div>

    <div class="cart-text">
      <p class="text-center">${cart.price}x${cart.qty}=${totalcost}</p>
    </div>
      
     <div class="control">
      <span class="pl-mi removecart" id="r${cartt.id}"><span class="material-icons">
      cancel
      </span></span>
     </div><br>`;
     html+=li;

    
div.innerHTML=html;
homecart.append(div)



//increase qty in cart
const increaseqty=document.querySelector(`#i${cartt.id}`)
increaseqty.addEventListener('click',e=>{
  let id = e.target.parentElement.parentElement.parentElement.getAttribute('id');
  console.log("increased",id)
  increaseqtydb(id);
  cartprice=0;
})

//decrease qty in cart
const decreaseqty=document.querySelector(`#d${cartt.id}`)
decreaseqty.addEventListener('click',e=>{
  let id = e.target.parentElement.parentElement.parentElement.getAttribute('id');
  console.log("decrease",id)
  decreasedb(id);
  cartprice=0;
})

//remove item in cart
const remove=document.querySelector(`#r${cartt.id}`)
remove.addEventListener('click',e=>{
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('id');
    console.log(id)
    console.log("remove btn clicked");
    removecart(id)
    cartprice=0;
})



}



//4ONMfVmuZUhfIHY87DcwmmA3A3c2

// db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(pap=>{
//   let changes=pap.docChanges();
//   changes.forEach(change => {
//       if(change.type=='added'){
//           indexcart(change.doc);
//       } else if(change.type=='removed'){
//           let div=homecart.querySelector('[id=' + change.doc.id + ']');
//           homecart.removeChild(div);
//       } else if(change.type=='modified'){
//           let div=homecart.querySelector('[id=' + change.doc.id + ']');
//           homecart.removeChild(div);
//           indexcart(change.doc);
//       }
     
//   })
// })


var cartprice=0;

//total cart price is here
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(pap=>{

    pap.docs.forEach(cap=>{
    
      cartprice=cartprice+(cap.data().qty*cap.data().price)
    
    })
    console.log('cart price',cartprice)
    var li2;
    li2=`
    <p class="text-center totalCart"><b>Totalcart:</b> ${cartprice}</p>
    `;
    carttotal.innerHTML=li2;
    
    
    
    })
  }
}
)


//user dashboard
const usernamefield=document.querySelector('.usernamefield')
var uservalue=1;
usernamefield.addEventListener('click',(e)=>{
  getuserorders()
  if(uservalue==1){
    document.querySelector('.back-layer3').style.display="block";
    uservalue=0;

  }
  else{
    document.querySelector('.back-layer3').style.display="none";
    uservalue=1;

  }
 
})

//<div class="my-orders">
//orders
// const ordersappend=document.querySelector('.ordersappend')
// const fridge=document.querySelector('.fridge');
// ordersappend.addEventListener('click',(e)=>{
//   const div=document.createElement('div')
//   div.setAttribute('class',"my-orders")
//   var li=`     
    
//   <div class="order-pic">
//     <div class="order-pic2">
//       <div>
//         <img src="1.jpg" alt="">
//       </div>
    
//   <div>
//     <h5> Nikon  5d</h5>
 
//     <p><span>Qty: </span>&nbsp; 8</p>
//     <p><span>Price:</span>&nbsp; 9000</p>

    
//   </div>
     
   
      
  
//     </div>
   
//     </div>
   
 
//   <p><span>Order Id:</span> jhgsdfhhghsdksjvskhvsh</p>
//   <p><span>Payment Id:</span> shjbvfjhajhguh</p>
//   <p><span>Payment status:</span> success</p>
//     <p><span>From: </span>20/20/20 20:20 P.M.</p>
//     <p><span>To: </span>20/20/20 20:20 A.M. </p>
//   `;
// div.innerHTML=li
// fridge.append(div)

// })

//orders

const ordersappend=document.querySelector('.ordersappend')
const fridge=document.querySelector('.fridge');

function displayorders(data){
 // fridge.innerHTML="";
  
  if(data.products.length>4){
    for(var i=0;i<data.products.length;i=i+4){
      const div=document.createElement('div')
      div.setAttribute('class',"my-orders")
      var li=`     
        
      <div class="order-pic">
        <div class="order-pic2">
          <div>
            <img src="${data.products[i+3]}" alt="">
          </div>
        
      <div>
        <h5> ${data.products[i+0]}</h5>
     
        <p><span>Qty: </span>&nbsp; ${data.products[i+1]}</p>
        <p><span>Price:</span>&nbsp; ${data.products[i+2]}</p>
    
        
      </div>
         
       
          
      
        </div>
       
        </div>
       
     
      <p><span>Order Id:</span>${data.orderid}</p>
      <p><span>Payment Id:</span>${data.paymentid}</p>
      <p><span>Payment status:</span>${data.paymentstatus}</p>
        <p><span>From: </span>${data.pickupdate}</p>
        <p><span>To: </span>${data.returndate}</p>
      `;
    div.innerHTML=li
    fridge.append(div)
    
    }
  }
  else{
    const div=document.createElement('div')
    div.setAttribute('class',"my-orders")
    var li=`     
      
    <div class="order-pic">
      <div class="order-pic2">
        <div>
          <img src="${data.products[3]}" alt="">
        </div>
      
    <div>
      <h5> ${data.products[0]}</h5>
   
      <p><span>Qty: </span>&nbsp; ${data.products[1]}</p>
      <p><span>Price:</span>&nbsp; ${data.products[2]}</p>
  
      
    </div>
       
     
        
    
      </div>
     
      </div>
     
   
    <p><span>Order Id:</span>${data.orderid}</p>
    <p><span>Payment Id:</span>${data.paymentid}</p>
    <p><span>Payment status:</span>${data.paymentstatus}</p>
      <p><span>From: </span>${data.pickupdate}</p>
      <p><span>To: </span>${data.returndate}</p>
    `;
  div.innerHTML=li
  fridge.append(div)
  
  }

}


// function displayorders(data){
//   console.log('product length',data.products.length)
//   const div=document.createElement('div')
//   div.setAttribute('class',"my-orders")
//   var li=`     
    
//   <div class="order-pic">
//     <div class="order-pic2">
//       <div>
//         <img src="${data.products[3]}" alt="">
//       </div>
    
//   <div>
//     <h5> ${data.products[0]}</h5>
 
//     <p><span>Qty: </span>&nbsp; ${data.products[1]}</p>
//     <p><span>Price:</span>&nbsp; ${data.products[2]}</p>

    
//   </div>
     
   
      
  
//     </div>
   
//     </div>
   
 
//   <p><span>Order Id:</span>${data.orderid}</p>
//   <p><span>Payment Id:</span>${data.paymentid}</p>
//   <p><span>Payment status:</span>${data.paymentstatus}</p>
//     <p><span>From: </span>${data.pickupdate}</p>
//     <p><span>To: </span>${data.returndate}</p>
//   `;
// div.innerHTML=li
// fridge.append(div)

// }









