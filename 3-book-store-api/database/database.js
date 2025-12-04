const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    // my password constains an @ so i must encode it as %40 otherwise error show karega
    await mongoose.connect(
      "mongodb+srv://abhinav:Abhinav%402004@revisioncluster.nqbi6fb.mongodb.net/"
    );
    console.log("connected To DB Yay!")
  } catch (error) {
    console.log("error occured in connecting to db", error)
    process.exit(1)
  }
};

module.exports = connectToDB