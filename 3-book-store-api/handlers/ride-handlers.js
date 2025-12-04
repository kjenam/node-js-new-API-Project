const rideModel = require("../models/ride-model.js");
const addNewRideHandler = async (req, res) => {

  try {
    const { name, description, price, minHeightReq,rating, isOpen } = req.body;
    const ride = await rideModel.create({
      name,
      description,
      price,
      minHeightReq,
      rating,
      isOpen,
    });
    return res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Occurred While creating Ride", error });
  }
};
const removeRideHandler = async (req, res) => {
  try{
    const {ride} = req.params;
    const rideInfo = await rideModel.findOne({name: ride})
    if (!rideInfo) { 
      console.log("NOOOo")
      return res.status(404).json({message: "ERR ride not found"})
    }
    const deletedRide = await rideModel.findOneAndDelete({name: ride})
    console.log("YOOOOO")
    return res.status(200).json({deletedRide}) 
  }catch(e){
      return res.status(500).json({message: "Error Occured while deleting ride"})   
  }
};

const getRideInfoHandler = async (req, res) => {
 
  try{
    const { ride } = req.params;
    const rideInfo = await rideModel.findOne({name: ride})

    if (!rideInfo) {
      return res.status(404).json({message: "ERR ride not found"})
    }

    return res.status(200).json({rideInfo})

  }catch(error){
    return res.status(500).json({message: "Error Occured while fetching ride"})
  }
};

module.exports = { addNewRideHandler, removeRideHandler, getRideInfoHandler };
