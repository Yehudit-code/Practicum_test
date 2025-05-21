const mongoose = require ("mongoose")
const { stringify } = require("querystring")


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    start:{
      type:Number,
      required:true
    },
    end:{
      type:Number,
      required:true
    },
    current:{
      type:Number,
      required:true
    },
    active:{
      type:Boolean,
      default:false,
      
    },
    
    steps:{
      type:Number,
      default:0
    },
  }, {
    timestamps: true 
  });

module.exports = mongoose.model('User', userSchema)
