//pull the terms and conditions here
db.collection('termsandconditions').doc('terms').get().then(snap=>{
    let pushterms=document.getElementById('pushterms')
    pushterms.innerText= snap.data().terms;
  })