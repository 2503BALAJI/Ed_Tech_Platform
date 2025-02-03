const mongoose= require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
        trim:true
    }
})
module.exports = mongoose.model("RatingAndReview", ratingAndReviewsSchema)