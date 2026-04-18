const mongoose = require('mongoose');
const { timeStamp } = require('node:console');
const { type } = require('node:os');

const userSchema =  mongoose.Schema({


name:{

    type:String,
    required:true
},
age:{
    type:Number,
     required:true,
     min:15,
     max:100

},
gender:{
  type:String,
  required:true
},
role:{
    type:String,
    required:true,
}





},
{
    timeStamp:true
}
);

const userModel  = mongoose.model('user',userSchema);


module.exports = userModel;