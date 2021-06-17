var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var sql = require("mssql/msnodesqlv8");

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/userDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/Signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('userDB').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect("dashboard.html")

})



app.post("/Designup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('designDB').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect("design.html")

})


app.post("/Logup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('logisticsDB').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect("logistics.html")

})


app.post("/Login", (req,res)=>{
    var username = req.body.email;
    var Password = req.body.password;

    db.collection('userDB').findOne({email: username},(err, foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if (foundUser){
                if (foundUser.password === Password){
                    return res.redirect("dashboard.html")
                }else{
                    
                    //alert("Invalid user or password");
                    return res.redirect("Login.html")
                }
            }
        }
    });
});


app.post("/Logisin", (req,res)=>{
    var username = req.body.email;
    var Password = req.body.password;

    db.collection('logisticsDB').findOne({email: username},(err, foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if (foundUser){
                if (foundUser.password === Password){
                    return res.redirect("logistics.html")
                }else{
                    
                    //alert("Invalid user or password");
                    return res.redirect("Logisin.html")
                }
            }
        }
    });
});


app.post("/Deslogin", (req,res)=>{
    var username = req.body.email;
    var Password = req.body.password;

    db.collection('designDB').findOne({email: username},(err, foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if (foundUser){
                if (foundUser.password === Password){
                    return res.redirect("design.html")
                }else{
                    
                    //alert("Invalid user or password");
                    return res.redirect("Deslogin.html")
                }
            }
        }
    });
});




app.post("/Designer", function (req, res){
    var sqlConfig = {
        user: 'rahul', //username created from SQL Management Studio
        password: 'Test123',
        server: 'LAPTOP-6A75V5HK',    //the IP of the machine where SQL Server runs
        port:'1433',
        driver: 'msnodesqlv8',
        options: {
            //instanceName: 'MSSQLSERVER',
            database: "Back office operations",  //the username above should have granted permissions in order to access this DB.
            debug: {
                packet: false,
                payload: false,
                token: false,
                data: false
            },
        }
    
    };
    function des(){
        var conn = new sql.ConnectionPool(sqlConfig);
        var request = new sql.Request(conn);

        conn.connect(function (err){
            if (err){
                console.log(err);
                return;
            }
            request.query("Insert into Designer (Order_ID, Design_Status, Invoice_Status, Bill_Status) VALUES ('"+req.body.Oid+"','"+req.body.DR+"','"+req.body.IS+"','"+req.body.BS+"')", function(err, recordset){
                if (err){
                    console.log(err);
                }
                else{
                    console.log("1 Field Inserted");
                    console.log(recordset);
                    res.redirect("/design.html");
                }
                conn.close();
            });
        });
    }
    des()

});

app.post("/Logisticsupd", function (req, res){
    var sqlConfig = {
        user: 'rahul', //username created from SQL Management Studio
        password: 'Test123',
        server: 'LAPTOP-6A75V5HK',    //the IP of the machine where SQL Server runs
        port:'1433',
        driver: 'msnodesqlv8',
        options: {
            //instanceName: 'MSSQLSERVER',
            database: "Back office operations",  //the username above should have granted permissions in order to access this DB.
            debug: {
                packet: false,
                payload: false,
                token: false,
                data: false
            },
        }
    
    };
    function des(){
        var conn = new sql.ConnectionPool(sqlConfig);
        var request = new sql.Request(conn);

        conn.connect(function (err){
            if (err){
                console.log(err);
                return;
            }
            request.query(("UPDATE Logistics SET Tracking_details = '"+req.body.ST+"' where Order_ID = '"+req.body.PO+"' "), function(err, recordset){
                if (err){
                    console.log(err);
                }
                else{
                    console.log("1 Field Updated");
                    console.log(recordset);
                    res.redirect("/logisticsupd.html");
                }
                conn.close();
            });
        });
    }
    des()

});


app.post("/Logistics", function (req, res){
    var sqlConfig = {
        user: 'rahul', //username created from SQL Management Studio
        password: 'Test123',
        server: 'LAPTOP-6A75V5HK',    //the IP of the machine where SQL Server runs
        port:'1433',
        driver: 'msnodesqlv8',
        options: {
            //instanceName: 'MSSQLSERVER',
            database: "Back office operations",  //the username above should have granted permissions in order to access this DB.
            debug: {
                packet: false,
                payload: false,
                token: false,
                data: false
            },
        }
    
    };
    function logistics(){
        var conn = new sql.ConnectionPool(sqlConfig);
        var request = new sql.Request(conn);

        conn.connect(function (err){
            if (err){
                console.log(err);
                return;
            }
            request.query("Insert into Logistics (Order_ID, Bill_status, Receipt_status, Tracking_details) VALUES ('"+req.body.PO+"','"+req.body.BOG+"','"+req.body.Rec+"','"+req.body.ST+"')", function(err, recordset){
                if (err){
                    console.log(err);
                }
                else{
                    console.log("1 Field Inserted");
                    console.log(recordset);
                    res.redirect("/logistics.html");
                }
                conn.close();
            });
        });
    }
    logistics()

});
  



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("/Signup.html");
}).listen(3000);

app.get("/Designup",(req, res)=>{
    res.redirect("/Designup.html");
});

app.get("/Logup",(req, res)=>{
    res.redirect("/Logup.html");
});

app.get("/Login",(req, res)=>{
    res.redirect("/Login.html");
});

app.get("/Deslogin",(req, res)=>{
    res.redirect("/Deslogin.html");
});

app.get("/Logisin",(req, res)=>{
    res.redirect("/Logisin.html");
});

app.get("/Logistics",(req, res)=>{
    res.redirect("/logistics.html");
});

app.get("/Logisticsupd",(req, res)=>{
    res.redirect("/logisticsupd.html");
});

app.get("/Designer",(req, res)=>{
    res.redirect("/design.html");
});
console.log("Listening on PORT 3000");