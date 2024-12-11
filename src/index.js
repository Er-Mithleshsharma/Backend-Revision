const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const connectDb = require("./config/Db")
const User = require("./models/user")
const app = express();

app.use(express.json());
// saving dummy data 
app.post("/signup",(req,res)=>{
    try{
            const user = new User({
        firstName:"mithlesh",
        lastName:"sharma",
        password:"xxxxxx",
        emailId:"itsyour.rohan@gmail.com"
    })
    user.save()
    res.send("user saved successfully")
    }
    catch(err)
    {
     res.status(400).send("something went wrong ")
    }

})

// saving data received form client in body 
app.post("/signup/v2", async (req, res) => {
    const data = req.body
    try {
        const { firstName, emailId, password } = req.body;
        if (!firstName || !emailId || !password) {
            return res.status(400).send("Missing required fields: name, email, or password");
        }
        const user = new User(data);
        await user.save();
        res.send("User saved successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send("Something went wrong");
    }
});




// This is how we should start the server -> we should see if the db is connected then only server should be started
// since if server gets start earlier and anyone hit the api and db hasnt stared yet it may throw errors
connectDb().then(()=>{
   app.listen(7777,()=>{
    console.log("server started")
})
}).catch((err)=>{
    console.log(err);
})