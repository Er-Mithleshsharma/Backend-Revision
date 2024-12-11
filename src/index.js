const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const app = express();

// so we need to define a middleware before all admin routes since order matters 

app.use("/admin",Adminauth)


 // so till now we were using these inner functions but they have a name they are called middlewares 
 //middleware is a function which has access to the route req , res , next object and comes in between the req res cycle 

 // so why middleware ?
 // lets discuss with some example 
 // suppose we want to make some admin routes where admin can perfrom opearions 
// one thing to read body of req we need to use express.json middleware for now but ill explain it later on
app.use(express.json())
 app.post("/admin/getAllData", (req,res)=>{
    // Auth check logic 
    const correctPassword = "xxxx";
    const enteredPassword = req.body.password
    if(correctPassword === enteredPassword)
    { 
        // db logic 
        res.send("all data sent ");
    }
    else res.status(401).send("unauthorized access")
 })

 app.post("/admin/getPaymentStats", (req,res)=>{
    // Auth check logic 
    const correctPassword = "xxxx";
    const enteredPassword = req.body.password
    if(correctPassword === enteredPassword)
    { 
        // db logic 
        res.send("all data sent ");
    }
    else res.status(401).send("unauthorized access")
 })

//  we dont want auth check in the signup api since use your common sence bro (iski bhi explanation duga to sar gya tumara )
// so in that case we either need to give a conditon in the middleware funtion like if user.url is /signup then simply call next()
// or define this route above that middleware's defination then also it will work the way we want
 app.post("/admin/signup", (req,res)=>{
   
    
        // db logic
        res.send("all data sent ");
 
   
 })

// now imagine writing hundereds of admin routes , then writing the same logic for auth check agiain and again is a 
//bad practice and will also voilate the dry principle(do not repeat yoursself )
//so here comes the middlewares for the solution 


app.listen(7777,()=>{
    console.log("server started")
})
 