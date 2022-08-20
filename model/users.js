const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    recentPasswords : { type : [String] , default : [] },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);


let User = mongoose.model("User", UserSchema);

module.exports = User;
