const express = require("express");
const app = express();

// Types of methods in http requests 
app.get("/",(req,res)=>{
    res.send("used to get data from backend");
})
app.post("/",(req,res)=>{
    res.send("used to send data to backend");
})

app.patch("/",(req,res)=>{
    res.send("Partially updates the resource with only the fields provided.");
})

app.put("/",(req,res)=>{
    res.send("Replaces the entire resource with the new data provided.");
})

app.delete("/",(req,res)=>{
    res.send("used to delete some data from  db")
})


app.get("/",(req,res)=>{
    res.send("get api called");
})

// dyanmic routes : req.params 
// this will be only called when an id is provided else it wont get called
http://localhost:7777/user/xyz - > {id : "xyz"}
app.get("/user/:id",(req,res)=>{
    console.log(req.params)
    res.send(req.params)
})

// req.query : query parameters /abc?a=5&b=10
// the req.query will contain an object containg key value pairs {a:6}
// http://localhost:7777/user?a=hello
app.get("/user",(req,res)=>{
    console.log("query params")
   res.send(req.query)
})

// using regex while defining routes 


// this route works if the url ends with fly like http://localhost:7777/butterfly 
app.get("/*fly$/",(req,res)=>{
    console.log("ending with fly")
   res.send("ending with fly")
})

// using + -> works for /abbbbc , a(any number of b's)c 
app.get("/ab+c",(req,res)=>{
   res.send("+")
})

// using * means that the letter is optional like here /ac , /abc both will work 
app.get("/ab*c",(req,res)=>{
   res.send("*");
})

// we can also club some char together in route using ()

app.get("/a(bc)*d",(req,res)=>{
    res.send("*");  // works for /abcd or /ad->  a(bc is optional)d
 })
 
 app.get("/a(bc)+d",(req,res)=>{
    res.send("*");  // works for /abcbcbcd ->  a(bc any number of times)d
 })
 
app.listen(7777,()=>{
    console.log("server started")
})