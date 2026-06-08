import { Router } from "express";
import { validate, carValidationRules } from '../middleware/validator.js'
import {
    getAllSuvs,
    addSuv,
    deleteSuv
} from "../controllers/suv.js";
import { isAthenicated } from '../middleware/authenicate.js'

const suvRoutes = Router();

suvRoutes.get("/", getAllSuv);
suvRoutes.post("/", addSuv);
suvRoutes.delete("/:id", deleteSuv);

export { suvRoutes };
