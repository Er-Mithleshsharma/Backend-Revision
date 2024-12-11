const { MongoGCPError } = require("mongodb");
const mongoose = require("mongoose");

// creating a schema - > defining the structure of the document  , what the document contains (feilds)

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
})

// creating a model which will help us to create instances of user
const User = mongoose.model("users",userSchema);
module.exports = User;