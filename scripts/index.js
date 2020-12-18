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
function uniquefeed2(data){
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
          <a href="#" class="btn btn-light rentit" id="${cam.id}">Rent</a>
        </div>
      </div>
  </div>
    `
    html+=li;
    unique.innerHTML=html

  
  })
  const rent =document.querySelectorAll('.rentit');
rent.forEach(rant=>{
  rant.addEventListener('click',e=>{
    console.log("rentedd")
    var ids =e.target.getAttribute('id')
    console.log(ids)
    search(maincategory,ids);
  })
})

}

function uniquefeed3(data){
  console.log("feed",data)
  console.log("uniquefeed3")
 
  let html='';
  var li;
data.forEach(nup=>{
  console.log(nup);

   nup.forEach(cam=>{

    console.log("id",cam.id)
    li=`   <div class="col-lg-3 col-md-4 col-sm-6">      
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${cam.data().link}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" >${cam.data().name}</h5>
          <p class="card-text">${cam.data().price}</p>
          <a href="#" class="btn btn-light rentit" id="${cam.id}">Rent</a>
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
const paymentSections = document.querySelector('.payment-sections');
rent.forEach(rant=>{
  rant.addEventListener('click',e=>{
    console.log("rented")
    paymentSections.style.display = "block";
    rant.setAttribute('href', "#payment-sections1");
    var ids =e.target.getAttribute('id')
    console.log(ids)
    search(maincategory,ids);
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


function indexcart(cart){
  const homecart=document.querySelector('.cart-home')
 // const div = document.createElement('div');
  let html='';
  var li;
  li=`
  <div >
  <img src="${cart.link}" alt="">
</div>
     <div>
      <p>
      ${cart.name}
      </p>
     </div>
    
     <div class="control">
      <p class="pl-mi"><span >-</span></p>
      <span class="count-span">1</span>
      <p  class="pl-mi"><span>+</span></p>
    </div>

    <div>
      <p>${cart.price}</p>
    </div>
      
     <div class="control">
      <span class="pl-mi">X</span>
     </div>`;
     html+=li;

homecart.innerHTML=html;
}






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