const mongoose = require("mongoose")

const connectDb = async () =>{
     mongoose.connect("mongodb+srv://itsyourrohan:gS9an1a5yR40FMfp@namastenode.dkgy2.mongodb.net/testing")
}

module.exports = connectDb;