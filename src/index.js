const express = require("express");
const Adminauth = require("./middlewares/AdminAuth");
const connectDb = require("./config/Db");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
const app = express();
const validator = require("validator");
const validateSignupData = require("./utils/signupValidation");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cookieParser())
app.post("/cookie",(req,res)=>{
    res.cookie("Token", "kida22g")
    res.send("kidAA")
})

app.get("/profile",async (req,res)=>{
    const token  = req.cookies.token;
    try {
    if(!token) 
    {
      throw new Error("token not provided");
    }
    const decoded = jwt.verify(token , "secret-key") // if token not matched it will throw an error invalid signatuee 
    console.log("h",decoded) // once error is thrown next lines wont be executed and control will go to catch 
    const {_id} = decoded;
    const user = await User.findById(_id)
    if(!user)
    {
      throw new Error("user not found ");
    }
    res.send(user)
  }
  catch (err)
  {
      res.status(400).send(err.message)
  }

})

app.post("/signup", async (req, res) => {
  // data validation
  validateSignupData(req,res);
  //password encryption
  const { password, firstName, lastName, emailId,age } = req.body;
  const hashedPAssword = await bcrypt.hash(password, 10);
  // saving the user in db
  const user =  await new User({
    firstName,
    lastName, 
    emailId,
    password: hashedPAssword,
    age
  });
 await user.save();
 res.send("data saved")
});

app.post("/login",async (req,res)=>{
    try {
        const {emailId, password} = req.body;
        // validate the email 
        if(!emailId || !password)
        {
            throw new Error("Invalid credentails")
        }
        if(!validator.isEmail(emailId))
        {
            throw new Error("Invalid credentails")
        }
        // getting the user from db
         const user = await User.findOne({emailId:emailId})
         if(!user){
            throw new Error("Invalid Credentials") // email is not there in db
         }
         const isPasswordValid = await bcrypt.compare(password, user.password);
         if(isPasswordValid){
          // create a jwt token and send it to user 
          const jwt_string = jwt.sign({_id:user._id}, "secret-key");
          res.cookie("token",jwt_string)
                 
            res.send("login successfull ")
         }
         else 
         {
            throw new Error("password incorrect / invalid credentials")
         }

    }
    catch(err)
    {
         res.status(400).send(err.message)
    }
})

// This is how we should start the server -> we should see if the db is connected then only server should be started
// since if server gets start earlier and anyone hit the api and db hasnt stared yet it may throw errors
connectDb()
  .then(() => {
    app.listen(7777, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
