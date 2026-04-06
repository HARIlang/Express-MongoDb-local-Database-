const { type } = require("express/lib/response");
const mongoose = require("mongoose");



   // structure  of a document

const productSchema = mongoose.Schema({                 // it only define the model not validate the model
  name: {
    type: String,
    required: [true, "the product must have name "],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },

  image: {
    type: String,
    required: false,
  },
},
{
  timestamps: true
});


  // the collection name should be named in singular form

const product = mongoose.model("product", productSchema);  // creating the collection with the given schema    

module.exports = product;     // export to index.js
