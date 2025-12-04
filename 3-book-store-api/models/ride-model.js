const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema(

  {
    name:{type: String, required: true, unique: true, trim: true},
    description:{type: String, trim: true, default: "No Description Availabe"},
    price:{type: Number, required: true},
    minHeightReq:{type: Number, default: 0},
    rating : {type: Number, required: true},
    isOpen:{type: Boolean, default: true},
  },

  {timestamps: true}
)

const rideModel = mongoose.model("Ride", rideSchema)
module.exports = rideModel