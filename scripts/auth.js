
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
window.lrecaptchaVerifier = new firebase.auth.RecaptchaVerifier('lrecaptcha-container');
const adharfront=document.querySelector('.adharfront')
const adharback=document.querySelector('.adharback')
const otherid=document.querySelector('#otherid')
const profilepic=document.querySelector('#profilepic');


var mainuser;
var mainusercond;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     mainuser=user
     mainusercond=1;

     const querySnapshot = db.collection('users').doc(user.uid).collection('profile').get()
if (querySnapshot) {console.log('profile not existed')}

     var li;
     db.collection('users').doc(user.uid).collection('profile').doc(user.uid).onSnapshot(snap=>{
       li=`<i class="fas fa-user-circle"></i> <a href="#" class="logout-button ">${snap.data().name}</a>`
         document.querySelector('.usernamefield').innerHTML=li;
         document.querySelector('.usernamefield').style.display="block";
         document.querySelector('#displayname').innerHTML=snap.data().name;
         document.querySelector('#displaynumber').innerHTML=snap.data().phone;
         document.querySelector('#displaycity').innerHTML=snap.data().location;
         userstatus=snap.data().status;
     })
    

    } else {
     console.log("user not login")
     document.querySelector('.usernamefield').style.display="none";
    }
  });

//signup
document.querySelector('.vali').style.display="none"
const generateotp=document.querySelector('.generateotp');
generateotp.addEventListener('click', (e)=>{
    const numm="+91" + document.querySelector('.phonenumber').value;
    console.log(numm);
  firebase.auth().signInWithPhoneNumber(numm,window.recaptchaVerifier) 
  .then(function(confirmationResult) {
    window.confirmationResult = confirmationResult;
    console.log(confirmationResult);
    document.querySelector('#recaptcha-container').style.display="none";
    document.querySelector('.verifyotp').style.display="block";
    document.querySelector('.vali').style.display="block"



  }).catch(function(error){alert(error)});
})
var phonenumber;
signupsubmit=document.querySelector('.signupsubmit')
verifyotp=document.querySelector('.verifyotp');
verifyotp.addEventListener('click',(e)=>{
    console.log(document.querySelector('.verificationcode').value);
   
    window.confirmationResult.confirm(document.querySelector(".verificationcode").value)
    .then(function(result) {
        //add user data to db
        phonenumber=document.querySelector('.phonenumber').value;
      console.log(result);
      // let querysna=db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').get();
      // if(querysna){
      //   // firebase.auth().signOut();
      //   // alert("your not registered please do register");
      //   // location.reload();
        
      //   alert("You are already registered")
      //   document.querySelector('.back-layer').style.display="none";
      // }
      // else {
      //   console.log("not registered")
      // }
      let querysna=db.collection('users').doc(firebase.auth().currentUser.uid);
      querysna.get().then(function(doc) {
        if (doc.exists) {
                   alert("You are already registered")
        document.querySelector('.back-layer').style.display="none";
        }
        else{
          $(".regname").css("display", "block");
          $(".regaadhar").css("display", "block");
          $(".location").css("display", "block");
          $(".regformcheck").css("display", "block");
          $(".signupsubmit").css("display", "block");
        }
    })
     // document.querySelector('.back-layer').style.display="none";
    }).catch(function(error){alert(error)});
})

//login
const lgenerateotp=document.querySelector('.lgenerateotp');
lgenerateotp.addEventListener('click', (e)=>{
    const numm="+91" + document.querySelector('.lphonenumber').value;
    console.log(numm);
  firebase.auth().signInWithPhoneNumber(numm,window.lrecaptchaVerifier) 
  .then(function(lconfirmationResult) {
    window.lconfirmationResult = lconfirmationResult;
    console.log(lconfirmationResult);
    document.querySelector('#lrecaptcha-container').style.display="none";
    document.querySelector('.verify-input').style.display="block";
    document.querySelector('.lverifyotp').style.display="block";
  }).catch(function(error){alert(error)});
})
lverifyotp=document.querySelector('.lverifyotp');
lverifyotp.addEventListener('click',(e)=>{
    console.log(document.querySelector('.lverificationcode').value);
   
    window.lconfirmationResult.confirm(document.querySelector(".lverificationcode").value)
    .then(function(result) {
        //add user data to db
        phonenumber=document.querySelector('.lphonenumber').value;
      console.log(result);
    

      let querysna=db.collection('users').doc(firebase.auth().currentUser.uid);
      querysna.get().then(function(doc) {
        if (!doc.exists) {
          firebase.auth().signOut();
          alert("your not registered please do register");
          location.reload();
        }
        else document.querySelector('.back-layer2').style.display="none";
    })

    }).catch(function(error){alert(error)});


})


// signupsubmit.addEventListener('click',(e)=>{







  function accessto(){


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         console.log("user login")
         const signinname=document.querySelector('.signinname');
         const altnumber=document.querySelector('#altphone');
         const profession=document.querySelector('.signinprofession');
         const adharnumber=document.getElementById('adharnumber');
     
         let astatus=false;
  db.collection("users").where("adharnumber", "==", adharnumber.value)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        astatus=true;
      });
  }).then(()=>{
    const signinlocation=document.querySelector('.signinlocation')
    if(altnumber.value==phonenumber) alert("phone number, alternative phone number must not be same")
    if(astatus==false){
    db.collection('users').doc(user.uid).collection('profile').doc(user.uid).set({
        name:signinname.value,
        phone:phonenumber,
        location:signinlocation.value,
        adharfront:adharcardf,
        adharback:adharcardb,
        promocode:"eligible",
        status:"active",
        altnumber:altnumber.value,
        profession:profession.value,
        otherid:otheridlink,
        profilepic:profilelink,
        adharnumber:adharnumber.value,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){ 
      astatus=true;
     document.querySelector('.back-layer').style.display="none";
     return db.collection('users').doc(user.uid).set({adharnumber:adharnumber.value,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      phone:phonenumber
    })
 
     })
     .catch(function(err){
         console.log(err)
     })
   }
   else alert(`Already account created with this adharcard ${adharnumber.value} please do register with new adharcard`)
   
  })
        }
 
        else {
         console.log("user not login")
        }
      })
  
 
    }
    
// })
var adharcardf;
var adharcardb;
var otheridlink;
var profilelink;


//profilepic photo code
profilepic.addEventListener('change',(e)=>{
  var file=e.target.files[0];
  console.log("profile click")
  uploaderb=document.querySelector('#profilepicp');
 // crate storage ref
var storageref=storage.ref(`users/${mainuser.uid}/profile/` + file.name);

   //upload file
 var task=storageref.put(file);

    //update progress bar
task.on('state_changed',
function progress(snapshot){
  var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  uploaderb.value=percentage;
},
  function error(err){
  console.log(err)
},
function complete(){
console.log("profile id uploaded successfully ")
task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  console.log('File available at', downloadURL);
  profilelink=downloadURL
});
}
);

})





//other any id proof
otherid.addEventListener('change',(e)=>{
  var file=e.target.files[0];
  console.log("other id click")
  uploaderb=document.querySelector('#otheridp');
 // crate storage ref
var storageref=storage.ref(`users/${mainuser.uid}/profile/` + file.name);

   //upload file
 var task=storageref.put(file);

    //update progress bar
task.on('state_changed',
function progress(snapshot){
  var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  uploaderb.value=percentage;
},
  function error(err){
  console.log(err)
},
function complete(){
console.log("other id uploaded successfully ")
task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  console.log('File available at', downloadURL);
  otheridlink=downloadURL
});
}
);

})

//adhar back
adharback.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    console.log("adhar click")
    uploaderb=document.querySelector('#uploaderb');
   // crate storage ref
  var storageref=storage.ref(`users/${mainuser.uid}/profile/` + file.name);

     //upload file
   var task=storageref.put(file);

      //update progress bar
  task.on('state_changed',
  function progress(snapshot){
    var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    uploaderb.value=percentage;
  },
    function error(err){
    console.log(err)
  },
  function complete(){
  console.log("adhar back uploaded successfully ")
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    adharcardb=downloadURL
  });
}
  );

})

//adhar front
adharfront.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    console.log("adhar click")
    uploaderf=document.querySelector('#uploaderf');
   // crate storage ref
  var storageref=storage.ref(`users/${mainuser.uid}/profile/` + file.name);

     //upload file
   var task=storageref.put(file);

      //update progress bar
  task.on('state_changed',
  function progress(snapshot){
    var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    uploaderf.value=percentage;
  },
    function error(err){
    console.log(err)
  },
  function complete(){
  console.log("adhar front uploaded successfully")
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    adharcardf=downloadURL
  });
}
  );

})

//upload files
// var uploader=document.querySelector('#uploader');
// var filebutton=document.querySelector('#filebutton');
// filebutton.addEventListener('change', (e)=>{
//   var file=e.target.files[0];

//   //crate storage ref
//   var storageref=storage.ref('photos/' + file.name);

//   //upload file
//   var task=storageref.put(file);

//   //update progress bar
//   task.on('state_changed',
//   function progress(snapshot){
//     var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
//     uploader.value=percentage;
//   },

//   function error(err){
//     console.log(err)
//   },

// function complete(){
//   console.log("file uploaded successfully")
//   task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//     console.log('File available at', downloadURL);
//   });
// }
//   );

// });





// setupguides();
db.collection('homesliders').onSnapshot(snapshot=>{
    console.log(snapshot.docs)
    var sekhar=snapshot.docs;
       sekhar.forEach(sek=>{
        var guide=sek.data();
        console.log(guide.sliders);
    setupguides(guide.sliders)
   
    })
    
})


var pappu=[];


function advancedsearch(productid){
  db.collection('categorybutton').onSnapshot(id=>{
    id.docs.forEach(id2=>{
      for (var name of Object.keys(id2.data())) {
        console.log("object keys",Object.keys(id2.data()).length)
        console.log("path",id2.id,name)
        db.collection('categorybutton').doc(id2.id).collection(name).onSnapshot(snapp=>{
         snapp.docs.forEach(pan=>{
           if(pan.id==productid){
            console.log(`product id ${productid},searchid ${pan.id}, qty is ${qte} category${name}`);
             console.log('your product details',pan.data())
             db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(pan.id).set({
              name:pan.data().name,
              price:Number(pan.data().price),
              qty:1,
              link:pan.data().link,
              productid:pan.id,
              qtylimit:Number(pan.data().qty)
            })
           }
         })
    
        });
    }
    })
  })

}

function removecart(id){
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).delete().then(()=>{enddate.value='';})
}





     //adding cart item id to user cart firestore
     function search2(id){

    //  const  arrayUnion = firebase.firestore.FieldValue.arrayUnion;//append value to array using this 
       db.collection('users').doc(mainuser.uid).collection('cart').doc(id).set({
       productid:id,qty:1
       }).then(function(){
         console.log("added to user cart")
       
       }).catch(err=>{console.log(err)}
       )
     }



function increaseqtydb(id){//increase cart qty in db
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).update({
    qty:firebase.firestore.FieldValue.increment(1)
  })
  enddate.value='';
}

function decreasedb(id){//decrease qty cart in db
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).update({
    qty:firebase.firestore.FieldValue.increment(-1)
  })
  enddate.value='';
}

function database2(id){
    pappu=[];
    db.collection('categorybutton').doc(id).get().then(snap=>{
        console.log(snap)
        let count=0;
for (var name of Object.keys(snap.data())) {
    count=count+1;
    console.log("object keys",Object.keys(snap.data()).length)
    console.log(name.length)
    db.collection('categorybutton').doc(id).collection(name).get().then(snapp=>{
       
   pappu.push(snapp.docs)
   console.log("count ",count)
   if(count>Object.keys(snap.data()).length)
   {
       pappu=[]
   }
   if(count==Object.keys(snap.data()).length){
  //  uniquefeed3(pappu)
   
  
   }

    });
}    })
 
}




//this function append all product in home page
let productdbc=db.collection('categorybutton')
productdbc.get().then(tap=>{
    tap.forEach(main=>{
        productdbc.doc(main.id).get().then(snap=>{
            for (var name of Object.keys(snap.data())) {
                console.log(name)
                productdbc.doc(main.id).collection(name).get().then(nap=>{
                 
                    // nap.forEach(cap=>{
    
                    // })
                    append1(nap)
                })
            }
        })
    })

})







function database(id,subcat){
    console.log("databse id is",id)
    db.collection('categorybutton').doc(id).collection(subcat).get().then(snapp=>{
        console.log(snapp.docs)
        var sek=snapp.docs;
        sek.forEach(up=>{
            console.log(up.data())
        })
      //  uniquefeed2(snapp.docs)  
        
    })
}





const logout=document.querySelector('.logoutbtn')
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    var user = firebase.auth().currentUser;


if (user != null) {
    var uid;

  uid = user.uid;  
                   console.log("login uid",uid)
}

    firebase.auth().signOut().then(function() {
      document.querySelector('.usercart').style.display="none"
      document.querySelector('.payment-sections').style.display="none";
        console.log("logout successfully");
        location.reload();
      }).catch(function(error) {
       console.log(`error while logout ${error}`);
      });
      
})


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(pap=>{
  homecart.innerHTML='';
  pap.forEach(nap=>{
    indexcart(nap)
  })
  
})
  }})

  //get user orders here
  function getuserorders(){
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('orders').onSnapshot(snap=>{
      fridge.innerHTML="";
      snap.forEach(nap=>{
        console.log(nap.data());
        displayorders(nap.data());
      })
    })
  }


  //
  function minuscart(productid,qte){
    db.collection('categorybutton').get().then(id=>{
      id.docs.forEach(id2=>{
        for (var name of Object.keys(id2.data())) {
              // console.log("object keys",Object.keys(id2.data()).length)
          console.log("path",name);
          minuscart2(productid,qte,id2,name);
      }
      })
    })
  
  }

  
  function minuscart2(productid,qte,id2,name){

    db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
      console.log("category is",name)
     snapp.docs.forEach(pan=>{
       if(pan.id==productid){
        console.log('your product details',pan.data())
        console.log(`product id ${productid},searchid ${pan.id}, qty is ${pan.data().qty} category${name}`);
        db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).get().then(cnap=>{
          console.log(cnap.data())
          qte=cnap.data().qty-qte;
          console.log(qte)
        }).then(()=>{
          console.log("updating ")
          return db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).update({
             qty:qte
          
          })

        })

       }
     })

    })
    
  }





  //add service
  function addservice(){
    const servicepicp=document.querySelector('#servicepicp');
    const servicename=document.querySelector('#servicename')
    const servicesubject=document.querySelector('#servicesubject')
    const servicedescription=document.querySelector('#servicedescription')
    const servername=document.querySelector('#servername')
    const servernumber=document.querySelector('#servernumber')
    let doc=db.collection('repairs').doc();
    doc.set({
      servicepic:servicepicvalue,
      servicename:servicename.value,
      servicesubject:servicesubject.value,
      servicedescription:servicedescription.value,
      servername:servername.value,
      servernumber:servernumber.value,
      date:new Date().toDateString(),
      time:new Date().toTimeString(),
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{

      servicepicp.value=0;
      servicename.value='';
      servicesubject.value='';
      servicedescription.value='';
      servername.value='';
      servernumber.value='';
      document.querySelector('.productdiv').style.display="none";
      alert("Your request successfully submited");
    }).catch(err=>{
      alert("can't handle this right now");
    })
  }


  //service pic upload herhe
  const servicepic=document.querySelector('#servicepic');
  var servicepicvalue;
  servicepic.addEventListener('change',(e)=>{
  var file=e.target.files[0];
  console.log("service pic click")
  uploaderb=document.querySelector('#servicepicp');
 // crate storage ref
var storageref=storage.ref(`repairs/` + file.name);

   //upload file
 var task=storageref.put(file);

    //update progress bar
task.on('state_changed',
function progress(snapshot){
  var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  uploaderb.value=percentage;
},
  function error(err){
  console.log(err)
},
function complete(){
console.log("other id uploaded successfully ")
task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  console.log('File available at', downloadURL);
  servicepicvalue=downloadURL
});
}
);

})


// //where option is here
// // Create a reference to the cities collection
// var citiesRef = db.collection("orders");

// // Create a query against the collection.
// var query = citiesRef.where("paymentstatus", "==", "success");
// query.get().then(snap=>{
//   snap.forEach(nap=>{
//     console.log(nap.id ,'=>',nap.data())
//   })
// })


