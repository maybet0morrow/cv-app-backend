const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Comment = require("../models/comment")

const api = supertest(app)

//some basic tests

let token = ""
describe("comment tests", () => {
  beforeEach(async () => {
    await Comment.deleteMany()
    await api
      .post("/api/comments")
      .send({content:"Example comment."})
      .set({"Authorization" : `Bearer ${token}`})
  })



  describe("get tests", () => {
    test("content is returned as json", async () => {
      await api
        .get("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })

    test("get without token returns 401", async () => {
      const response = await api
        .get("/api/comments")
        .expect(401)
      expect(response.body.error).toBe("invalid token")
    })

    test("get with invalid token returns 401", async () => {
      const response = await api
        .get("/api/comments")
        .set({"Authorization" : `Bearer ${token.substring(5)}`})
        .expect(401)
      expect(response.body.error).toBe("invalid token")
    })

    test("comments include the initialized values", async () => {
      const response = await api
        .get("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
      expect(response.body[0].content).toBe("Example comment.")
    })

  })
  describe("post tests", () => {
    test("post without token returns 401", async () => {
      const response = await api
        .post("/api/comments")
        .send({content:"testing"})
        .expect(401)
      expect(response.body.error).toBe("invalid token")
    })

    test("post with invalid token returns 401", async () => {
      const response = await api
        .post("/api/comments")
        .send({content:"testing"})
        .set({"Authorization" : `Bearer ${token.substring(5)}`})
        .expect(401)
      expect(response.body.error).toBe("invalid token")
    })

    test("valid comment get added.", async () => {
      const response = await api
        .post("/api/comments")
        .send({content:"testing"})
        .set({"Authorization" : `Bearer ${token}`})
        .expect(200)
      expect(response.body.content).toBe("testing")
    })

    test("too short comment post return 400", async () => {
      const response = await api
        .post("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
        .send({content:"ts"})
        .expect(400)
      expect(response.body.error).toBe("Comment validation failed: content: Path `content` (`ts`) is shorter than the minimum allowed length (3).")
    })
    test("too long comment post fails with 400", async () => {
      await api
        .post("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
        .send({content:"012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"})
        .expect(400)
    })
    test("posted comment can be found with get", async () => {
      const commentContent = "This is /-\n example comment with söme stränge |3tters & characters.¯\_(ツ)_/¯"
      await api
        .post("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
        .send({content:commentContent})
        .expect(200)
      const response = await api
        .get("/api/comments")
        .set({"Authorization" : `Bearer ${token}`})
        .expect(200)
        .expect("Content-Type", /application\/json/)
      const comments = response.body.map(a => a.content)
      expect(comments).toContain(commentContent)

    })



  })


})
afterAll(() => {
  mongoose.connection.close()
})


