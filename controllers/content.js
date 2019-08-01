const contentRouter = require("express").Router()
const Content = require("../models/content")
const jwt = require("jsonwebtoken")


const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }
  return null
}


contentRouter.get("/", async (request, response, next) => {
  const token = getTokenFrom(request)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: "token missing or invalid"})
    }
    const contents = await Content.find({})
    response.json(contents.map(content => content.toJSON()))
  }catch(exception){
    next(exception)
  }
})

contentRouter.post("/", async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id || decodedToken.username !== "admin"){
      return response.status(401).json({error: "token missing or invalid"})
    }

    const content = new Content({
      name : body.name,
      profile : body.profile,
      skills: body.skills,
      address : body.address,
      zipAndCity : body.zipAndCity,
      phone : body.phone,
      email : body.email,
      education : body.education,
      jobHistory : body.jobHistory
    })
    const savedContent = await content.save()
    response.json(savedContent.toJSON())
  }catch(exception){
    next(exception)
  }
})

module.exports = contentRouter
