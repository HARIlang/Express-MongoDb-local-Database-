const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

const productModel = require("./models/productModel");
const { error } = require("node:console");
const product = require("./models/productModel");

app.use(express.json());

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("the database is connected ");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello bro");
});


// post api for store the data of the product

app.post("/api/products",   async (req, res) => {
 
  try{
   
     const Product = await productModel.create(req.body);
     res.status(200).json({
      success:true,
      data:product
     });



  }
  catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    }) 
  
  }
});




app.listen(4000, () => {
  console.log("the server is running in port 4000");
});
