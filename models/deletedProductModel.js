const { default: mongoose } = require("mongoose");
const { timeStamp } = require("node:console");

const mongoose = require(mongoose);


const deletedProductSchema = mongoose.Schema({

  id:{
    type:String,
    required:true
    },
   name:{
  type:String,
  required:true

  }


},
{
    timeStamp:true
}
)