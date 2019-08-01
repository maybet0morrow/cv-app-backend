const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }
  return null
}

commentsRouter.get("/", async (request, response, next) => {
  const token = getTokenFrom(request)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: "token missing or invalid"})
    }

    const comments = await Comment.find({})
      .populate("user", {name:1})
    response.json(comments.map(note => note.toJSON()))
  }catch(exception){
    next(exception)
  }
})


commentsRouter.delete("/:id", async (request, response, next) => {
  const token = getTokenFrom(request)

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: "token missing or invalid"})
    }
    await Comment.findByIdAndRemove(request.params.id)
    await response.status(204).end()
  }catch(exception){
    next(exception)
  }
})


commentsRouter.post("/", async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id){
      return response.status(401).json({error: "token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)

    const comment = new Comment({
      content: body.content,
      date: new Date(),
      user: user._id
    })


    const savedComment = await comment.save()
    user.comments = user.comments.concat(savedComment._id)
    await user.save()
    response.json(savedComment.toJSON())
  }catch(exception){
    next(exception)
  }
})

module.exports = commentsRouter