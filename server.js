const express = require("express");
require('dotenv').config();

const userRoute= require('./router/userRoute.js');

const db = require('./db/db.js'); // database connection



const app = express();


app.use(express.json());

db();  // calling database file in server


app.use('/api/users',userRoute);    // setting the route

const PORT = process.env.PORT

app.listen(PORT , ()=>{
  console.log(`the server is running in port ${PORT}`);
}) 