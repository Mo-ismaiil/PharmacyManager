
   var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024);
   var btn =document.getElementById("loginbtn");
   let CustName,type,option,itemName,quantity,date,price; 
    btn.addEventListener("click",function(){
        console.log('Clicked');
        CustName = document.getElementById('cust').value;
        type = document.getElementById('select');
        option= type.options[type.selectedIndex].text;
        itemName = document.getElementById('item').value;
        quantity = document.getElementById('quan').value;
        date = document.getElementById('date').value;
        localStorage.date = date;
        localStorage.CustomerName = CustName;
        localStorage.TransactionType = option;
        console.log(CustName,option,itemName,quantity,date);
        var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024);
        db.transaction((tx)=>{
        tx.executeSql('select quantity from Items where name = ?',[itemName],function(tx,results){
        if(results.rows.item(0).quantity <= 0){
        alert("Sorry, This item isout of stock!");
        // tx.executeSql('delete from Items where name = ?',[itemName]);
        }else{       
        tx.executeSql('insert into Invoices(date,CustomerName,type,item,quantity) values(?,?,?,?,?)',[date,CustName,option,itemName,quantity]);
        if(option === "Sell")
        tx.executeSql('update Items set quantity = quantity - ? where name = ?',[quantity,itemName]);
        else 
        tx.executeSql('update Items set quantity = quantity + ? where name = ?',[quantity,itemName]);
        }

        });
        })      
    })

