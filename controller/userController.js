const express = require("express");
const userModel = require("../models/usersModel.js"); // importing user model from the model we created

const createUser =  async  (req, res) => {
  try {
    const { name, age, gender, role } = req.body;      // destructuring the body request
    const existingUser = await userModel.findOne(name);     // validating the user already exist 
    if (existingUser) {
      return res.status(400).json({        // return if the user already exist
        message: `the user is already exist in the name of ${existingUser}`,
        success: false,
      });
    }

    const insertUser = await userModel.create(name, gender, role, age);   // if the user not exist , the user data is inserted
    res.status(201).json({
      message: "the user is created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal-server error",
      error: error.message,
    });
  }
};

module.exports = {createUser}