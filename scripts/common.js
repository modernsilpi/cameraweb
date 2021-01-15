const loginli=document.querySelector('.loginli');
const registerli=document.querySelector('.registerli');
const logoutli=document.querySelector('.logoutli');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     mainuser=user
     mainusercond=1;
     loginli.style.display="none";
     registerli.style.display="none";
     logoutli.style.display="block";
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
     loginli.style.display="block";
     registerli.style.display="block";
     logoutli.style.display="none";
    }
  });
