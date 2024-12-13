const { MongoGCPError } = require("mongodb");
const mongoose = require("mongoose");

// creating a schema - > defining the structure of the document  , what the document contains (feilds)
// schema level validations ->

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:35
    },
    lastName:{
        type:String,
        required :true,
        minLength:4,
        maxLength:35
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        required:true, 
        min:18
    },
    skills:{
        type:[String],
    },
    about:{
           type:String, 
           defalut:"this is the default value if nothing is entered it will keep this by defalt"
    },
    gender:{
        type:String,
        validate(value)
        {
            if(!['male','female','others'].includes(value))
            {
                throw new error("gender not valid")
            }
        }
    },
    photoUrl :{
        type:String,
    }
    
    
},   {
        timestamps:true
    })

// creating a model which will help us to create instances of user
const User = mongoose.model("users",userSchema);
module.exports = User;