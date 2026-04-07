const express = require("express");
require('dotenv').config()

const db = require('./db/db.js') // database connection

const app = express();

db();  // calling database file in server


const PORT = process.env.PORT

app.listen(PORT , ()=>{
  console.log(`the server is running in port ${PORT}`)
})