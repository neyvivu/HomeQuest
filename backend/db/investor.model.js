import mongoose, { Schema } from "mongoose";

const investorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      uppercase:true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      uppercase:true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked:
    {
      type:Boolean,
      default:false
    },
    lockedAt:
    {
      type:Date,
      default:null
    },
    profilepic: {
      type: String,
      default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
    },
    userType:
    {
      type:String,
      default:"Investor",
      unmodifiable:true
    },
    watchList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    }]
  },
  { timestamps: true }
);

const Investor = mongoose.model("Investor", investorSchema, "invsetors");
export default Investor;