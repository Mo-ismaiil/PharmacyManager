var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024);
db.transaction((tx)=>{
 //let Adminpass = CryptoJS.MD5("123"); 
 tx.executeSql("Create table if not exists Users(username unique,password)");
 tx.executeSql("Create table if not exists Items(name unique,quantity,price,picture)");
 tx.executeSql("Create table if not exists Invoices(date,CustomerName,type,item,quantity)");
 tx.executeSql('Insert into Users(username,password) values(?,?)',["Admin","123"]);
});
var newuser,newpass; 
let adduserbtn=document.getElementById("adduser");
///////add new user by admin////////////
if(adduserbtn){
adduserbtn.addEventListener("click",function(){
    console.log("clicked");
    newuser=document.getElementById("user").value;
    newpass=document.getElementById("pass").value; 
    console.log(newuser);
    console.log(newpass);

    db.transaction((tx)=>{
        if(newuser && newpass){ 
       tx.executeSql('Insert into Users(username,password) values(?,?)',[newuser,newpass]);
       alert(` ${newuser} added sucssful`);
       }
       else{
         alert(console.error());
       } 
       });
});
}
// delete user
 /*db.transaction((tx)=>{
      tx.executeSql('delete from Users where username = ?',["[object HTMLInputElement]"],function(tx){
        alert("Item deleted")});
  });*/

//////////login//////////
var user;
var pass;
let loginbtn=document.getElementById("loginbtn");
let isSuccessful = false;
let msg = '';
var u = document.getElementById("user");
var p = document.getElementById("pass");
if(loginbtn){
    loginbtn.addEventListener("click",function(){
        console.log("clicked");
        user =u.value;
        pass =p.value;
        console.log(user);
        var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024); 
        db.transaction((tx)=>{
          tx.executeSql('Select username,password from Users',[],function(tx,results){
            var len = results.rows.length,i;
            console.log(len);
            console.log(user);
            console.log(pass);
            for(i = 0;i<len;i++){
             if(user == results.rows.item(i).username && pass == results.rows.item(i).password)
             {
                msg ="Login Succesful";
                isSuccessful = true; 
                localStorage.ActiveUser = user;
                break;      
             }
             else
             {
                msg ="Username or Password is incorrect!";
                isSuccessful = false;
             }
            }
            alert(msg);
             if(isSuccessful){
             if(user === "Admin")
              window.location.href="../html/admin.html";
              else if (user !== "Admin") 
              window.location.href ="../html/add item.html";
            }
            });
        });
    });
}
