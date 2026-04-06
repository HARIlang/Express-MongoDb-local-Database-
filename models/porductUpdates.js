const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const productUpdates = mongoose.Schema({


    old_name:{
        type:String
        
    },
    new_name:{
        type:String
    }

});

const updatesModel = mongoose.model('productUpdate',productUpdates);

module.exports = updatesModel;