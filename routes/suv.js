import { Router } from "express";
import { validate, carValidationRules } from '../middleware/validator.js'
import {
    getAllSuvs,
    getSuv,
    addSuv,
    putSuv,
    deleteSuv
} from "../controllers/suv.js";
import { isAuthenticated } from '../middleware/authenicate.js'

const suvRoutes = Router();

suvRoutes.get("/", isAuthenticated, getAllSuvs);
suvRoutes.get("/:id", isAuthenticated, getSuv);
suvRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, putSuv);
suvRoutes.post("/", isAuthenticated, carValidationRules(), validate, addSuv);
suvRoutes.delete("/:id", isAuthenticated, deleteSuv);

export { suvRoutes };
