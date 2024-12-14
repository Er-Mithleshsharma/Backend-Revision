const validator = require("validator")
const validateSignupData = (req,res)=>{
    const {firstName, lastName, emailId, password} = req.body;
    try{
 if(!firstName || !lastName)
    {
        throw new Error("Name is not valid")
    }
    else if (firstName.length < 4 || firstName.length >50)
    {
        throw new Error("name should be between 4 - 50 characters ")
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("email not valid")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password not valid");
    }
    }
    catch(err)
    {
        res.status(400).send("error"+ err.message);
    } 
}
module.exports = validateSignupData; 