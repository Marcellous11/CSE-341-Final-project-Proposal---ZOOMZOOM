import { Router } from "express";
import { validate } from '../middleware/validator.js'
import {
    addUser,
    deleteUser,
    getAllUsers,
    getOneUser,
    updateUser
} from "../controllers/user.js";
import {isAuthenticated} from '../middleware/authenicate.js'

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getOneUser);
userRoutes.put("/:id", isAuthenticated, validate, updateUser);
userRoutes.post("/",isAuthenticated, validate, addUser);
userRoutes.delete("/:id", isAuthenticated, deleteUser);

export { userRoutes };
