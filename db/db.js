const { default: mongoose } = require("mongoose");
const { connect } = require("node:http2");
require('dotenv').config

const db = async () =>{

  try{
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log('db is connected ');
  }

catch(error){
console.log('database is failed to connect');
process.exit(1);
 

}



}

module.exports = db;
