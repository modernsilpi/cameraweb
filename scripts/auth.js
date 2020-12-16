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
    // console.log(`id1 is ${id1} id2 is ${id2}`)
    db.collection('categorybutton').doc(id1).onSnapshot(snup=>{
      //  console.log(snup.data())
   for(var name of Object.keys(snup.data())){
       db.collection('categorybutton').doc(id1).collection(name).onSnapshot(snapp=>{
               snapp.docs.forEach(pan=>{
            if(pan.id==id2){
                console.log(pan.data());
               
            }
            
            
        })
       })
   }
    })
     
     }
function database2(id){

    db.collection('categorybutton').doc(id).onSnapshot(snap=>{
        console.log(snap)
for (var name of Object.keys(snap.data())) {
    db.collection('categorybutton').doc(id).collection(name).onSnapshot(snapp=>{
       
   pappu.push(snapp.docs)
   uniquefeed3(pappu)
   pappu.pop(snapp.docs)
//    pappu=[];
    });
}
//uniquefeed3(pappu);
// pappu=[];



    })
 
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
            // var uids = snapp.data().sony;
            // for (var name of Object.keys(uids)) {
            //   console.log(name, uids[name]); // key, value
            // }
          
        
    })
}

