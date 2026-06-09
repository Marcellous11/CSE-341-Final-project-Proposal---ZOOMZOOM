import { Router } from "express";
import { validate, registerValidationRules, loginValidationRules } from '../middleware/validator.js'
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/user.js";
import { isAuthenticated } from '../middleware/authenicate.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const userRoutes = Router();

userRoutes.post("/register", authLimiter, registerValidationRules(), validate, registerUser)
userRoutes.post("/login", authLimiter, loginValidationRules(), validate, loginUser)
userRoutes.post("/logout", isAuthenticated, logoutUser)
userRoutes.get("/profile", isAuthenticated, getProfile)

export { userRoutes };
