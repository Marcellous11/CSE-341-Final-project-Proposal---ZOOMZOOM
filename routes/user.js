import { Router } from "express";
import {validate,carValidationRules} from '../middleware/validator.js'
import {
    addUser,
    deleteUser
} from "../controllers/user.js";
import {isAuthenticated} from '../middleware/authenicate.js'

const userRoutes = Router();

// userRoutes.get("/", )
// userRoutes.get("/:id", )
// userRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, )
userRoutes.post("/",isAuthenticated, carValidationRules(),validate,addUser);
userRoutes.delete("/:id", isAuthenticated, deleteUser);

export { userRoutes };
