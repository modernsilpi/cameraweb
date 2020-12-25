
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
window.lrecaptchaVerifier = new firebase.auth.RecaptchaVerifier('lrecaptcha-container');
const adharfront=document.querySelector('.adharfront')
const adharback=document.querySelector('.adharback')
var mainuser;
var mainusercond;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     mainuser=user
     mainusercond=1;
     var li;
     db.collection('users').doc(user.uid).collection('profile').doc(user.uid).onSnapshot(snap=>{
       li=`<i class="fas fa-user-circle"></i> <a href="#" class="logout-button ">${snap.data().name}</a>`
         document.querySelector('.usernamefield').innerHTML=li;
         document.querySelector('.usernamefield').style.display="block";
     })
    

    } else {
     console.log("user not login")
     document.querySelector('.usernamefield').style.display="none";
    }
  });

//signup
const generateotp=document.querySelector('.generateotp');
generateotp.addEventListener('click', (e)=>{
    const numm="+91" + document.querySelector('.phonenumber').value;
    console.log(numm);
  firebase.auth().signInWithPhoneNumber(numm,window.recaptchaVerifier) 
  .then(function(confirmationResult) {
    window.confirmationResult = confirmationResult;
    console.log(confirmationResult);
    document.querySelector('#recaptcha-container').style.display="none";
  });
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
      document.querySelector('.back-layer').style.display="none";
    }).catch(function(error) {
      console.log(error);
    });
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
  });
})
lverifyotp=document.querySelector('.lverifyotp');
lverifyotp.addEventListener('click',(e)=>{
    console.log(document.querySelector('.lverificationcode').value);
   
    window.lconfirmationResult.confirm(document.querySelector(".lverificationcode").value)
    .then(function(result) {
        //add user data to db
        phonenumber=document.querySelector('.lphonenumber').value;
      console.log(result);
      document.querySelector('.back-layer2').style.display="none";
    }).catch(function(error) {
      console.log(error);
    });
})


signupsubmit.addEventListener('click',(e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         console.log("user login")
         const signinname=document.querySelector('.signinname')
      
        
         const signinlocation=document.querySelector('.signinlocation')
         db.collection('users').doc(user.uid).collection('profile').doc(user.uid).set({
             name:signinname.value,
             phone:phonenumber,
             location:signinlocation.value,
             adharfront:adharcardf,
             adharback:adharcardb,
             array:[1,2,"sekhar","1","24"]
         }).then(function(){ 
      
          })
          .catch(function(err){
              console.log(err)
          })
        } else {
         console.log("user not login")
        }
      })
  
 

    
})
var adharcardf;
var adharcardb;
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
        console.log(guide.slider);
    setupguides(guide.slider)
    // setupguides2(cButtons)
    //uniquefeed(cButtons)
    })
    
})
db.collection('categorybutton').onSnapshot(snap=>{
   var cate=new Array()
   snap.forEach(nap=>{
       console.log(nap.id)
       cate.push(nap.id)
   })
   setupguides2(cate,snap.docs)
    // console.log("this are cats",snap.doc.id)
})

var pappu=[];
// function search(maincate,id2) {
  
//     db.collection('categorybutton').doc(maincate).onSnapshot(snup=>{
    
//    for(var name of Object.keys(snup.data())){
//        db.collection('categorybutton').doc(maincate).collection(name).onSnapshot(snapp=>{
//                snapp.docs.forEach(pan=>{
//             if(pan.id==id2){
//                 console.log(pan.data());
//               //  indexcart(pan);//cart products at home page
//               db.collection('users').doc(mainuser.uid).collection('cart').doc(pan.id).set({
//                 name:pan.data().name,
//                 price:pan.data().price,
//                 qty:1,
//                 link:pan.data().link
//               })
              
               
//             }
            
            
//         })
//        })
//    }
//     })
     
//      }

function advancedsearch(productid){
  db.collection('categorybutton').onSnapshot(id=>{
    id.docs.forEach(id2=>{
      for (var name of Object.keys(id2.data())) {
     //   count=count+1;
        console.log("object keys",Object.keys(id2.data()).length)
        console.log("path",id2.id,name)
        db.collection('categorybutton').doc(id2.id).collection(name).onSnapshot(snapp=>{
         snapp.docs.forEach(pan=>{
           if(pan.id==productid){
             console.log('your product details',pan.data())
             db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(pan.id).set({
              name:pan.data().name,
              price:pan.data().price,
              qty:1,
              link:pan.data().link
            })
           }
         })
    
        });
    }
    })
  })

}

function removecart(id){
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).delete()
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

//retrive user cart details
// function usercart(){
//   db.collection('users').doc(mainuser.uid).collection('cart').onSnapshot(snap=>{
//     snap.docs.forEach(nap=>{
//       console.log(nap.id)
//     })
//   })
// }

function increaseqtydb(id){//increase cart qty in db
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).update({
    qty:firebase.firestore.FieldValue.increment(1)
  })
}

function decreasedb(id){//decrease qty cart in db
  db.collection('users').doc(mainuser.uid).collection('cart').doc(id).update({
    qty:firebase.firestore.FieldValue.increment(-1)
  })
}

function database2(id){
    pappu=[];
    db.collection('categorybutton').doc(id).onSnapshot(snap=>{
        console.log(snap)
        let count=0;
for (var name of Object.keys(snap.data())) {
    count=count+1;
    console.log("object keys",Object.keys(snap.data()).length)
    console.log(name.length)
    db.collection('categorybutton').doc(id).collection(name).onSnapshot(snapp=>{
       
   pappu.push(snapp.docs)
   console.log("count ",count)
   if(count>Object.keys(snap.data()).length)
   {
       pappu=[]
   }
   if(count==Object.keys(snap.data()).length){
   uniquefeed3(pappu)
   
  
   }

    });
}    })
 
}




//this function append all product in home page
var kappu=[];
db.collection('categorybutton').onSnapshot(id=>{
  id.docs.forEach(id2=>{
    for (var name of Object.keys(id2.data())) {
   //   count=count+1;
      console.log("object keys",Object.keys(id2.data()).length)
      console.log("path",id2.id,name)
      db.collection('categorybutton').doc(id2.id).collection(name).onSnapshot(snapp=>{
         kappu.push(snapp.docs);
         uniquefeed3(kappu)
    //  snapp.docs.forEach(id3=>{
    //    console.log(id3.data());
    //  })
    
  
      });
  }
  })
})







function database(id,subcat){
    console.log("databse id is",id)
    db.collection('categorybutton').doc(id).collection(subcat).onSnapshot(snapp=>{
        console.log(snapp.docs)
        var sek=snapp.docs;
        sek.forEach(up=>{
            console.log(up.data())
        })
        uniquefeed2(snapp.docs)  
        
    })
}





const logout=document.querySelector('.logoutbtn')
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    var user = firebase.auth().currentUser;


if (user != null) {
    var username, email, photoUrl, uid, emailVerified;
  //username = user.displayName;
  //email = user.email;
 // photoUrl = user.photoURL;
  //emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
                   console.log("login uid",uid)
}

    firebase.auth().signOut().then(function() {
      document.querySelector('.usercart').style.display="none"
      document.querySelector('.payment-sections').style.display="none";
        console.log("logout successfully");
      }).catch(function(error) {
       console.log(`error while logout ${error}`);
      });
      
})


// db.collection('users').doc('4ONMfVmuZUhfIHY87DcwmmA3A3c2').collection('cart').onSnapshot(pap=>{
//   pap.docs.forEach(cap=>{
//     indexcart(cap);
//     console.log("mainusercond",cap)
//   })
// })




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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

db.collection('users').doc(firebase.auth().currentUser.uid).collection('cart').onSnapshot(pap=>{
  let changes=pap.docChanges();
  changes.forEach(change => {
      if(change.type=='added'){
          indexcart(change.doc);
      } else if(change.type=='removed'){
          let div=homecart.querySelector('[id=' + change.doc.id + ']');
          homecart.removeChild(div);
      } else if(change.type=='modified'){
          let div=homecart.querySelector('[id=' + change.doc.id + ']');
          homecart.removeChild(div);
          indexcart(change.doc);
      }
     
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
       //   count=count+1;
          console.log("object keys",Object.keys(id2.data()).length)
          console.log("path",id2.id,name)
          db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
           snapp.docs.forEach(pan=>{
             if(pan.id==productid){
              console.log(`product id ${productid},searchid ${pan.id}, qty is ${qte} category${name}`);
              db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).get().then(snap=>{
                console.log(snap.data().qty)
                qte=snap.data().qty-qte;
                console.log(qte)
              }).then(()=>{
                console.log("updating ")
                return db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).update({
                  //  qty:firebase.firestore.FieldValue.increment(`-${qte}`)
                  qty:qte
                
                })

              })

             }
           })
      
          });
      }
      })
    })
  
  }