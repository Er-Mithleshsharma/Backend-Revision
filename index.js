const express = require("express");
const app = express();

// we can pass any number of route handlers in btw the req -> res cycle for a single route 

app.get("/hero",(req,res)=>{
   console.log("function 1")
   res.send("function 1")
},
(req,res)=>{
    console.log("function 2")
},
(req,res)=>{
    console.log("function 3")
}
)

//  these functions chains won't get called automatically 
// we need to explicitly call them using next() in previous function

app.get("/",(req,res,next)=>{
    console.log("function 1")
   next()
 },
 (req,res,next)=>{
     console.log("function 2")
     next()
 },
 (req,res)=>{
     console.log("route handler")
      res.send("response") // this will be sent to client
 }
 )

 // we can also club these funtions using array notation []  like - app.get("/route",f1,[f2,f3],f4)
 app.get("/",(req,res,next)=>{
    console.log("function 1")
   next()
 },
 [(req,res,next)=>{
     console.log("function 2")
     next()
 },
 (req,res)=>{
     console.log("route handler")
      res.send("response") 
      next()
 }],
 (req,res)=>{
    console.log("route handler")
     res.send("response") // this will be sent to client
}
 )

 // what if the last route handler does next() ? -> your hw 

app.listen(7777,()=>{
    console.log("server started")
})
// note ->
 // when we call next then only control will move to next function in the chain 
 // one route can send only 1 response to client 
 // only one funtion from  function chain can send responce 
 // how it works is -> client req for the route -> req comes in and a tcp connetion is made btw clent and server 
 // and once express encounters res.send it sends the response and the tcp connection is lost 
 // thats why if we try to send againn it will give error 
 // all the incoming req to the route will go through this middleware chain until it encounters the route handler which actually send back the response
 

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


// now imagine writing hundereds of admin routes , then writing the same logic for auth check agiain and again is a 
//bad practice and will also voilate the dry principle(do not repeat yoursself )
//so here comes the middlewares for the solution 


// so we need to define a middleware before all admin routes since order matters 

app.use("/admin",(req,res, next)=>{
    const correctPassword = "xxxx";
    const enteredPassword = req.body.password
    if(correctPassword === enteredPassword)
    { 
       //go to route handler 
       next();
    }
    else 
    {
        // return from here.. 
        res.status(401).send("unauthorized access")
    }
})