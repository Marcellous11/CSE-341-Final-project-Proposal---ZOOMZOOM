import { Router } from "express";
import { validate } from '../middleware/validator.js'
import {
    addUser,
    deleteUser,
    getAllUsers
} from "../controllers/user.js";
import {isAuthenticated} from '../middleware/authenicate.js'

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
// userRoutes.get("/:id", )
// userRoutes.put("/:id", isAuthenticated, validate, )
userRoutes.post("/",isAuthenticated, validate, addUser);
userRoutes.delete("/:id", isAuthenticated, deleteUser);

export { userRoutes };
