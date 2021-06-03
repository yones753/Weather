const mongoose = require('mongoose')
const Schema = mongoose.Schema


const citySchema = new Schema({ 
    name: String,
    temp: Number,
    condition: String,
    conditionPic: String,
    isAdded : Boolean
  })


const City = mongoose.model("city", citySchema)
module.exports = City
