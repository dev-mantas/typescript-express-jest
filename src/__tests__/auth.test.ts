import request from "supertest"
import app from '../app'


describe("POST /api/register", () => {
    describe("All values successfully validated.", () => {
        test("Should respond with status 200.", async () => {
            const response = await request(app).post("/api/register").send({
                username: "Mantas",
                password: "Test123!"
            })
            expect(response.statusCode).toBe(200)
        })
    })
})
