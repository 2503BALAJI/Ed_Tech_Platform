const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    courses: [{   
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    }]
});

module.exports = mongoose.model("Tag", tagsSchema )