var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024);
db.transaction((tx)=>{
    //let Adminpass = CryptoJS.MD5("123"); 
    tx.executeSql("Create table if not exists Users(username unique,password)");
    tx.executeSql("Create table if not exists Items(name unique,quantity,price,picture)");
    tx.executeSql("Create table if not exists Invoices(date,CustomerName,type,item,quantity)");
    tx.executeSql('Insert into Users(username,password) values(?,?)',["Admin","123"]);
   });
////////////////items//////////////
var itemname = document.getElementById("itemName");
var itemprice = document.getElementById("itemPrice");
var itemQuantity = document.getElementById("itemQuantity");
var canvas = document.querySelector("#showscreenshot");
var video = document.querySelector("#videoElement");
var stop = document.getElementById('stop');
var take = document.getElementById('take');
let addbtn = document.getElementById("Btn");
var isAdded = false;
var img = document.querySelector("#showscreenshotimg");
////// take pic of item /////////
async function startCamera(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:false },)
        video.srcObject = stream;
    }
}
startCamera();
if(localStorage.myimage){
    img.src = localStorage.myimage;
}
function takescreenshot () {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      let imgAsStr = canvas.toDataURL("image/webp");
      console.log(imgAsStr);
      localStorage.myimage = imgAsStr;
      img.src = canvas.toDataURL("image/webp");
};

///////////////add item to DB//////////////////
if(addbtn){
    addbtn.addEventListener("click",function(){
        console.log("clicked");
    ItemName = itemname.value;
    quantity = itemQuantity.value;
    price = itemprice.value; 
    img = document.getElementById('showscreenshotimg').src;

    db.transaction((tx)=>{
           console.log(ItemName);
         tx.executeSql('select name from Items where name = ?',[ItemName],function(tx,results){
          console.log(results.rows.length);
          for(let i = 0; i<= results.rows.length;i++){
            if( results.rows.length > 0){ 
            if(results.rows.item(0).name == ItemName){
              tx.executeSql('update Items set quantity = quantity + ? , price = ? , picture = ? where name = ?',[quantity,price,img,ItemName])
              isAdded = true;
              alert("Your Item is added sucessfully!");
          break;
        }
     
    }   
    else{
    tx.executeSql('Insert into Items(name,quantity,price,picture) values(?,?,?,?)',[ItemName,quantity,price,img]);
    isAdded = true;
    alert("Your Item is added sucessfully!");
    break;
    }
    
        }
         });
    });
    
    });
    }


  