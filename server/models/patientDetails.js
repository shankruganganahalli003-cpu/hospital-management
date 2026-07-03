const mongoose = require("mongoose");


const patientschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    adress:{
        type:String,
        required:true
    },

    bloodGroup:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model("patient",patientschema);