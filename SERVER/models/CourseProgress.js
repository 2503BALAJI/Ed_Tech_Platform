const mongoose= require("mongoose");

const courseProgress = new mongoose.Schema({
  courseId:{
    Type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  },
  completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subSection"
        }
  ]
})

module.exports = mongoose.model("CourseProgress",courseProgress)