const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const connectDb = require("./config/Db")
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
const app = express();
const  validator = require('validator');

app.use(express.json());

//API level validations

// suppose you dont want email id to be updated once registerd 
// we do all this since backend is vlunarable if hacker tries to update or someone tries to put malicious data so wee need checks 
app.patch('/user',(req,res)=>{
    try {
         const ALLOWED_UPDATES =["photoUrl", "about" , "gender" , "age"] // only these things can be updated
    const data = req.body;
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k)) // . every checks for each element if it meets the specific condition or not
    if(!isUpdateAllowed)
    {
        throw new Error("update not allowed")
    }
    res.send("updated");
    //updation in db 
    }
    catch (err){
        res.status(500).send(err.message);
    }
  
})

// signup api validations 

app.post("/signup",(req,res)=>{
    try{
         const data = req.body;
    const {firstName, lastName, password, emailId,skills} = data;
    if(!(firstName || lastName))
    {
        throw new Error("Name not provided")
    }
    if(skills.length >10 )
    {
        throw new Error("you can add max upto 10 skills")
    }
    // for validating the email id we can take help of some external library such as validator.js (npm)
    const email_validation = validator.isEmail(emailId);
    if(!email_validation)
    {
        throw new Error("emailid doesnt seems to be an email id ")
    }
    res.send("doing db operations");
     }
    catch(err)
    {
        res.status(500).send("error "+err.message)
    }
   
})



// This is how we should start the server -> we should see if the db is connected then only server should be started
// since if server gets start earlier and anyone hit the api and db hasnt stared yet it may throw errors
connectDb().then(()=>{
   app.listen(7777,()=>{
    console.log("server started")
})
}).catch((err)=>{
    console.log(err);
})