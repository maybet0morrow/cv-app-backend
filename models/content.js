const mongoose = require("mongoose")


const educationSchema = new mongoose.Schema({
  name: String,
  degree: String,
  graduation: String,
  link: String,
})

const jobHistorySchema = new mongoose.Schema({
  employer: String,
  jobTitle: String,
  duration: String,
})

const contentSchema = new mongoose.Schema({
  name: String,
  address: String,
  zipAndCity: String,
  phone: String,
  email: String,
  profile: [String],
  skills: [String],
  education : [educationSchema],
  jobHistory: [jobHistorySchema]
})

contentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Content", contentSchema)