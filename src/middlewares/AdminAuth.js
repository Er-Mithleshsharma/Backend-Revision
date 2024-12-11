const Adminauth = (req,res,next)=>{
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
}
module.exports = Adminauth;