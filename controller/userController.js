const express = require("express");
const userModel = require("../models/usersModel.js"); // importing user model from the model we created
const { error } = require("node:console");
const { stat } = require("node:fs");

const createUser = async (req, res) => {
  try {
    let { name, age, gender, role } = req.body;

    name = name.trim();
    age = Number(age); // trim the extra space for the validation
    gender = gender.trim();
    role = role.trim();

    // destructuring the body request
    const existingUser = await userModel.findOne({ name }); // validating the user already exist
    if (existingUser) {
      return res.status(400).json({
        // return if the user already exist
        message: `the user is already exist in the name of ${existingUser.name}`,
        success: false,
      });
    }

    const insertUser = await userModel.create({ name, gender, role, age });
    if (!name || !age || !gender || !role) {
      // validate the empty filed

      return res.status(400).json({
        message: "the field should not be empty",
        success: false,
      });
    }

    if (isNaN(age)) {
      return res.status(400).json({
        message: "the age should be a number",
        success: false,
      });
    }

    res.status(201).json({
      message: "the user is created",
      success: true,
      data: insertUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal-server error",
      error: error.message,
    });
  }
};

// controller to delete the user

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); // for avoid the extra space

    if (!id) {
      // validate the id
      res.status(400).json({
        message: "invalid id",
        success: false,
      });
    }

    const deleteUser = await userModel.findByIdAndDelete( id );

    if (!deleteUser) {
      // if user not found in the given id
      return res.status(404).json({
        message: "there is no user in the given id",
        success: false,
      });
    }

    res.status(200).json({
      // user deleted
      message: "the user is removed",
      data: deleteUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server-error",
      error: error.message,
    });
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return res.status(404).json({
        message: "there is no users",
      });
    }

    res.status(200).json({
      message: "the users are",
      data: users,
    });
  } catch (error) {
    // find all users

    res.status(500).json({
      message: "internal server error form view users",
      error: error.message,
    });
  }
};

const findUser = async (req, res) => {
  //find user by name

  try {
    let { name } = req.params;
    name = name.trim();

    const user = await userModel.findOne({ name });

    if (!user) {
      res.status(404).json({
        message: `the user is not found in the ${name}`,
      });
    }

    res.status(200).json({
      message: "the user is found ",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error from find user by name",
      error: error.message,
    });
  }
};

module.exports = { createUser, deleteUser, viewUsers, findUser };
