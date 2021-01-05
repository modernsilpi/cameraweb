//pull the terms and conditions here
db.collection('termsandconditions').doc('about').get().then(snap=>{
    let pushabout=document.getElementById('pushabout')
    pushabout.innerText= snap.data().about;
  })