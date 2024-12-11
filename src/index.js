const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const connectDb = require("./config/Db")
const app = express();





// This is how we should start the server -> we should see if the db is connected then only server should be started
// since if server gets start earlier and anyone hit the api and db hasnt stared yet it may throw errors
connectDb().then(()=>{
   app.listen(7777,()=>{
    console.log("server started")
})
}).catch((err)=>{
    console.log(err);
})
