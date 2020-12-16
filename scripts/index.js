const block=document.querySelector('.carousel-inner');
const indicators = document.querySelector('.carousel-indicators');
const turnon=document.querySelector('.turnon');
const categoryButtons = document.querySelector('.buttons-container');

const unique=document.querySelector('.unique')
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
   // console.log("clicked")
    const target=e.target.closest('.camcut')
    // var pare=this.parentClass();
    // console.log(pare)
        // var a = this.value
    if (!target) return;
    const id = target.dataset.id;
     console.log(id)
     
    database(sendid,id);
  })
  
  
  } 





  
  
//   })


// }
function uniquefeed2(data){
  let html='';
  var li;
  data.forEach(cam=>{
    li=`          <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${cam.data().link}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${cam.data().name}</h5>
          <p class="card-text">${cam.data().price}</p>
          <a href="#" class="btn btn-light">Go somewhere</a>
        </div>
      </div>
  </div>
    `
    html+=li;
    unique.innerHTML=html

  // console.log(cam.data().name)
  })
}

function uniquefeed3(data){
  console.log("feed",data)
  // unique.innerHTML='';
  let html='';
  var li;
data.forEach(nup=>{
  console.log(nup);

  const div = document.createElement('div'); 
  nup.forEach(cam=>{
    console.log("id",cam.id)
    li=`          <div class="col-lg-3 col-md-4 col-sm-6">
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
    div.innerHTML=html
    unique.appendChild(div)
  // console.log(cam.data().name)
  })
})
const rent =document.querySelectorAll('.rentit');
rent.forEach(rant=>{
  rant.addEventListener('click',e=>{
    console.log("rented")
    var ids =e.target.getAttribute('id')
    console.log(ids)
    search(maincategory,ids);
  })
})
}
// if(rentstate==true){

// }

function uniquefeed(data){
   
    let html='';
    // console.log(data.data());
    // let sekhar=data.data();
   
            var uids = data.data();
            for (var name of Object.keys(uids)) {
              // console.log(name, uids[name]); // key, value
              for(var name2 of Object.keys(uids[name])){
                console.log(name2,uids[name][name2])
            
              var li;
              li=`          <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="card" style="width: 18rem;">
                  <img class="card-img-top" src="${uids[name][name2].link}" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${uids[name][name2].name}</h5>
                    <p class="card-text">${uids[name][name2].price}</p>
                    <a href="#" class="btn btn-light">Go somewhere</a>
                  </div>
                </div>
            </div>
              `
              html+=li;
              unique.innerHTML=html
            }
          }
  

  //  for(var i=0;i<3;i++){
      
    
  //       var li;
  //       li=`          <div class="col-lg-3 col-md-4 col-sm-6">
  //       <div class="card" style="width: 18rem;">
  //           <img class="card-img-top" src="{son.link}" alt="Card image cap">
  //           <div class="card-body">
  //             <h5 class="card-title">{son.name}</h5>
  //             <p class="card-text">{son.price}</p>
  //             <a href="#" class="btn btn-light">Go somewhere</a>
  //           </div>
  //         </div>
  //     </div>
  //       `
  //       html+=li;
  //       unique.innerHTML=html
  //   }
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
//   const cambut=document.querySelector('.cambut')
//   let hmtl='';
//   var ls;
//   data.forEach(nup=>{
//     console.log(nup.data())
  
//   for (var name of Object.keys(nup.data())) {
//     console.log(name)
//     ls=`<a class="dropdown-item" href="#">${name}</a>`;
//     hmtl+=ls;
//     cambut.innerHTML=hmtl;
//   }
// })
  
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

    // $(".camcut").click( function() {
    //   console.log("clicked ccamcut");
    //    this.parents().css("background","red");
      
    //   });
  //   const cambut=document.querySelector(`.cambutlens`)
  //   let hmtl='';
  //   var ls;
  //   data.forEach(nup=>{
  //     console.log(nup.id)
  //  if(nup.id=="lens"){
  //   for (var name of Object.keys(nup.data())) {
  //     console.log(name)
  //     ls=`<a class="dropdown-item" href="#">${name}</a>`;
  //     hmtl+=ls;
  //     cambut.innerHTML=hmtl;
  //   }
  // }
  
  // })
}
// function load(dat){
//     const dropout=document.querySelector('.dropmenu')
//     let catbut='';
//     var but;
//     console.log(dat.sub)
//     let fol=dat.sub
//     fol.forEach(element => {
//         console.log(element)
//         but=`<a class="dropdown-item" href="#">${element}</a>
//         `;
//         catbut+=but
//         dropout.innerHTML=catbut;
        
//     });

// }

// const categoryButtons2 = document.querySelectorAll('.dropdown-item');
// categoryButtons2[0].addEventListener("click",async e=>{
//   console.log("clicked")
// })


