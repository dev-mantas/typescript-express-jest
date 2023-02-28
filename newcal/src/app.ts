import express, { Request, Response } from "express"
import cors from "cors"
import { user_routes } from './routes/user.routes'
const app = express()
app.use(cors())

app.use('/api', user_routes)

export default app