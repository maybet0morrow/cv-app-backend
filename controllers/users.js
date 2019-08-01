const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = require("express").Router()
const User = require("../models/user")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }
  return null
}

userRouter.post("/", async (request, response, next) => {
  const token = getTokenFrom(request)
  try {
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET)
    //allows only user admin to create new users, since usernames are unique, only those with admin token can create users.
    if (!token || !decodedToken.id || decodedToken.username !== "admin"){
      return response.status(401).json({error: "token missing or invalid"})
    }
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      activated: false,
      comments: []
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

userRouter.get("/", async(request, response, next) => {
  const token = getTokenFrom(request)
  try {
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET)
    //Only author can access users, unless modifying activated
    if (!token || !decodedToken.id || decodedToken.username !== "admin"){
      return response.status(401).json({error: "invalid token "})
    }
    const users = await User.find({})
      .populate("comments", {content:1,date:1})
    response.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})



module.exports = userRouter