import express from 'express'
import { awaitHandler } from '../middlewares/awaitHandler.middleware'
import { registerUser } from '../services/user/user.services'
export const user_routes = express.Router()


user_routes.post('/register', awaitHandler(registerUser))