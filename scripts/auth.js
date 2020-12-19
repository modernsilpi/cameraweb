
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
const adharfront=document.querySelector('.adharfront')
const adharback=document.querySelector('.adharback')
var mainuser;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     mainuser=user
    } else {
     console.log("user not login")
    }
  });

//signup
generateotp=document.querySelector('.generateotp');
generateotp.addEventListener('click', (e)=>{
    const numm="+91" + document.querySelector('.phonenumber').value;
    console.log(numm);
  firebase.auth().signInWithPhoneNumber(numm,window.recaptchaVerifier) 
  .then(function(confirmationResult) {
    window.confirmationResult = confirmationResult;
    console.log(confirmationResult);
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
         db.collection('users').doc(user.uid).set({
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
function search(id1,id2) {
  
    db.collection('categorybutton').doc(id1).onSnapshot(snup=>{
    
   for(var name of Object.keys(snup.data())){
       db.collection('categorybutton').doc(id1).collection(name).onSnapshot(snapp=>{
               snapp.docs.forEach(pan=>{
            if(pan.id==id2){
                console.log(pan.data());
                indexcart(pan.data());//cart products at home page
               
            }
            
            
        })
       })
   }
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




const logout=document.querySelector('.logout')
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
        console.log("logout successfully");
      }).catch(function(error) {
       console.log(`error while logout ${error}`);
      });
      
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
