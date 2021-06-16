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


app.post("/Designer", function (req, res){
    // const dbconfig = {
    //     user: "rahul",
    //     password: "Test123",
    //     server: "MSSQLSERVER",
    //     database: "Back office operations",
        

    // };
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
            //encrypt: true
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
            request.query("Insert into Logistics (Order_ID, Design_Status, Invoice_Status, Bill_Status) VALUES ('"+req.body.Oid+"','"+req.body.DR+"','"+req.body.IS+"','"+req.body.BS+"')", function(err, recordset){
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
  
//   var server = app.listen(5000, function () {
//       console.log('Server is listening at port 5000...');

//   });


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("/Signup.html");
}).listen(3000);

app.get("/Designup",(req, res)=>{
    res.redirect("/Designup.html");
});

app.get("/Login",(req, res)=>{
    res.redirect("/Login.html");
});

app.get("/Designer",(req, res)=>{
    res.redirect("/design.html");
});
console.log("Listening on PORT 3000");