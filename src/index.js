const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const app = express();

// so we need to define a middleware before all admin routes since order matters 

app.use("/admin",Adminauth)

 app.post("/admin/signup", (req,res)=>{
   
    
        // db logic
        res.send("all data sent ");
 
   
 })

 // error middlewares  -> denfined at the last of all the code if any error is thrown in between it will catch all the errros 
// -> takes four parameters error , request , response , next --> order matters so write carefully 
 app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("something went wrong")
    }
 })

// If the error-handling middleware is defined at the end of the middleware stack in your Express application, and it is the last piece of middleware, you typically don’t need to call next, as there’s no subsequent middleware to pass control to.



app.listen(7777,()=>{
    console.log("server started")
})
 