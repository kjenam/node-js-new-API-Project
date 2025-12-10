const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    height: {
      type: Number, 
      required: true
    },
    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean, 
      default: false
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
