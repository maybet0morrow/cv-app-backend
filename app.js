const config = require("./utils/config")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")

const loginRouter = require("./controllers/login")
const contentRouter = require("./controllers/content")
const commentsRouter = require("./controllers/comments")
const userRouter = require("./controllers/users")

const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const logger = require("./utils/logger")

logger.info("connecting to", config.MONGODB_URI)

mongoose.set("useFindAndModify", false)
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/content", contentRouter)
app.use("/api/comments", commentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app