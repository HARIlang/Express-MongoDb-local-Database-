const express = require('express');
const router = express.Router();


const {createUser,deleteUser,viewUsers,findUser} = require('../controller/userController.js');
router.post('/',createUser)

router.delete('/:id',deleteUser);

router.get('/',viewUsers);

router.get('/:name',findUser);









module.exports = router;



