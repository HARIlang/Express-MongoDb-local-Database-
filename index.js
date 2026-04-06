const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

const productModel = require("./models/productModel");
const { error } = require("node:console");
const product = require("./models/productModel");
const { read } = require("node:fs");

const productUpdates =  require('./models/porductUpdates')


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

app.get("/api/products", async (req, res) => {
  // get api for find all the product
  try {
    const findProduct = await productModel.find();

    if (findProduct === 0) {
      res.status(200).json({
        message: "there is no products",
      });
    } else {
      res.status(200).json({
        message: "available products are",
        data: findProduct,
      });
    }
  } catch (error) {}
});

// post api for store the data of the product

app.post("/api/products", async (req, res) => {
  try {
    const { name, quantity, price, image } = req.body; // destructuring the model

    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      res.status(409).json({
        message: "the product is already exist",
      });
    } else {
      const product = await productModel.create({
        // by sending the destructuring model we can able to avoid the unwanted fields
        name,
        quantity,
        price,
        image,
      });
      res.status(201).json({
        success: true,
        message: "product is created",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// get api to find the product by the name

app.get("/api/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    // validation
    if (!name) {
      // validate the url if the wrong name is written
      res.status(400).json({
        message: "the product is not found in this name",
      });
    }

    const product = await productModel.findOne({ name });
    if (product == null) {
      // validate the name in the database
      return res.status(400).json({
        message: `the product is not found or not match the given name ${name}`,
        success: false,
      });
    } else {
      res.status(200).json({
        // view the data if the the name is found
        message: `the product is is found ${product.name}`,
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

app.put("/api/product/:id", async (req, res) => {
  // api to update the existing product with the given product id

  try {
    const { id } = req.params;
    const { name, quality, price } = req.body;

    const product = await productModel.findByIdAndUpdate(id, {
      name,
      quality,
      price,
    });

    if (!product) {
      return res.status(400).json({
        message: `the product is not found in the given ${id}`,
      });
    } 

     

      const updatedProduct = await productModel.findById(id);
      res.status(201).json({
        message:'this is the updated product',
        data:updatedProduct
      })
      console.log(product.name);
      console.log(updatedProduct.name)
    
 const updateList = await productUpdates.create({
        
        old_name:product.name,
        new_name:updatedProduct.name
      })
    


  } catch (error) {}
});

app.listen(4000, () => {
  console.log("the server is running in port 4000");
});
