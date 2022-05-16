var db = openDatabase('Pharmacy', '1.0', 'new database', 2 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql("select * from items ",null,function(tx,result){
                    console.log(result);
                
                },function(tx,err){
                    alert("error");
                });
            });


        function showItems(){
            db.transaction(function(tx){
                tx.executeSql("select * from items ",null,function(tx,result){
                    console.log(result);

                    let htmlCode = "";
                    for(let i=0;i<result.rows.length;i++){
                        let currentRecord = result.rows[i];

                        htmlCode += `
                            <tr>
                                <td>
                                <img src="${currentRecord.picture}"></img>
                                </td>
                                <td>
                                ${currentRecord.name}
            
                                </td>
                                <td>
                                    ${currentRecord.quantity}
                                </td>
                                <td>
                                ${currentRecord.price}
                                </td>
                            </tr>
                            `
                    }
                    itemsTableBody.innerHTML = htmlCode;
                },function(tx,err){
                    console.log(err);
                    alert(err.message);
                })
            })
        }
        showItems();
