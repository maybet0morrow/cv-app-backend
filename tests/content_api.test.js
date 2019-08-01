const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
const {testContent} = require("./test_helpers")

let token = ""

//no put or remove tests, the app doesn't need those.
describe("content tests", () => {
  test("content is returned as json", async () => {
    await api
      .get("/api/content")
      .set({"Authorization" : `Bearer ${token}`})
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("Contents has expected content", async () => {
    const response = await api
      .get("/api/content")
      .set({"Authorization" : `Bearer ${token}`})
    expect(response.body.length).toBe(1)
    expect(response.body[0].name).toBe("Niklas Impiö")
  })

  test("Without token, get request returns 401", async () => {
    await api
      .get("/api/content")
      .expect(401)
  })
  test("Without token post returns 401", async () => {
    const response = await api
      .post("/api/content")
      .send(testContent)
      .expect(401)
    expect(response.body.error).toBe("invalid token")
  })

  test("With non admin token api.post returns 401", async () => {
    const response =  await api
      .post("/api/content")
      .set({"Authorization" : `Bearer ${token}`})
      .send(testContent)
      .expect(401)
    expect(response.body.error).toBe("token missing or invalid")
  })


})
afterAll(() => {
  mongoose.connection.close()
})
