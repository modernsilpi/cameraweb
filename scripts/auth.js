// let cButtons = ["cameras", "lens", "accessories", "seconds"];

var logicc=0;
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



