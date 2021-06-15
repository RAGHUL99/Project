var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

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

console.log("Listening on PORT 3000");