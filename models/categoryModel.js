const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name   : {
        type : String ,
        lowercase : true ,
        minLength : [3    , 'The name is too short it must be atleast 3 chars'] ,
        maxLength : [35   , 'The name is too long it must be 35 chars at max'] ,
        required  : [true , 'The name of the category is required'] ,
        unique    : [true , 'A category with this name already exists']
    } ,
    slug  : {
        type : String ,
        lowercase : true 
    } ,
    image : {
        type : String
    }
}, {timestamps : true})

module.exports = Category = mongoose.model('Category', userSchema);