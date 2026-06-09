import { Router } from "express";
import {validate,carValidationRules} from '../middleware/validator.js'
import {
  addCar,
  deleteCar,
  getAllCars,
  getOneCar,
  updateCar
} from "../controllers/car.js";
import {isAuthenticated} from '../middleware/authenicate.js'

const carRoutes = Router();

carRoutes.get("/", isAuthenticated, getAllCars)
carRoutes.get("/:id", isAuthenticated, getOneCar)
carRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, updateCar)
carRoutes.post("/",isAuthenticated, carValidationRules(),validate,addCar);
carRoutes.delete("/:id", isAuthenticated, deleteCar);

export { carRoutes };
