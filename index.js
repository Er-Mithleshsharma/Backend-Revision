const express = require("express");
const app = express();

// app.use method is used to handle routes that 
// it adds a middleware in bewtween the rquest response pipeline
// This route handler will cator all the requests starting with  "/" 
app.use("/",(req, res)=>{
    res.send("route handled");
})


//code will never come to this route handler 
app.use("/test",()=>{
    res.send("testing")
})



app.listen(7777,()=>{
    console.log("server started")
})