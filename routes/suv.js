import { Router } from "express";
import { validate, carValidationRules } from '../middleware/validator.js'
import {
    getAllSuvs,
    getOneSuv,
    updateSuv,
    addSuv,
    deleteSuv
} from "../controllers/suv.js";
import { isAuthenticated } from '../middleware/authenicate.js'

const suvRoutes = Router();

suvRoutes.get("/", getAllSuvs);
suvRoutes.get("/:id", getOneSuv);
suvRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, updateSuv);
suvRoutes.post("/", addSuv);
suvRoutes.delete("/:id", deleteSuv);

export { suvRoutes };
