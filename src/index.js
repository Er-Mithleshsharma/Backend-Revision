const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const connectDb = require("./config/Db")
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

// api to get all users from db
app.get("/getallusers", async (req, res) => {
    try{
          const users = await User.find({}); //returns an array  
      res.send(users)
    }
    catch(err){
        res.send(err)
    }
    

});


//This will give all documents with that email id (ideally there should be unique email but for learning perspective im telling)
app.get("/getusersbyemailid", async (req, res) => {
    const {emailId} = req.body
    console.log(emailId)
    try{
          const users = await User.find({emailId:emailId}); // returns an array of documents that match 
      res.send(users)
    }
    catch(err){
        res.send(err)
    }
    

});

app.get("/getuserbyemailid", async (req, res) => {
    const {emailId} = req.body
    console.log(emailId)
    try{
          const users = await User.findOne({emailId:emailId}); // returns single document 
      res.send(users)
    }
    catch(err){
        res.send(err)
    }
    
});

// deletion using object id 
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ error: "Invalid user ID" }); // checks if user id is valid mongo object id 
    }
    try {
           const user = await User.findByIdAndDelete(userId) // it will throw an error if user id is not vlid so we need a check before 
           if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
           res.send(user);
    }
    catch(err)
    {
        res.send(err.message)
    } 
})

// updation using the user id 
app.patch('/user', async (req,res)=>{
    const userid = req.body.userId;
    const data = req.body;
    try {
            const user = await User.findByIdAndUpdate({_id: userid},data) // extra feilds in the data will be ignored which are not present in db and wont add new keys or entries  in db 
            res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
})

// user id should not be a part of the body it should come from header or url params to achievie that 
app.patch('/user/:userid', async (req,res)=>{
    const userid = req.params.userid
    const data = req.body;
    try {
            const user = await User.findByIdAndUpdate({_id: userid},data) // extra feilds in the data will be ignored which are not present in db and wont add new keys or entries  in db 
            res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
})

// update user by its email id
app.patch('/userbyemail', async (req, res) => {
    const email = req.body.emailId;
    const data = req.body;

    // Validate input
    if (!email || !data) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { emailId: email }, // Filter by email
            data,             // Update with new data
        );
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
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