const mongoose = require('mongoose');

const connectToDatabase = () =>{
    //connecting to database
    mongoose.connect(process.env.CONNECTION_STRING)
            .then(()=> console.log("connected to db successfully"))
            .catch((err)=>console.log(err));
}

module.exports = connectToDatabase ;