import { Router } from "express";
import {validate,carValidationRules} from '../middleware/validator.js'
import {
  addCar,
  deleteCar,
  getAllCars,
  getOneCar,
  updateCar
} from "../controllers/car.js";
import {isAthenicated} from '../middleware/authenicate.js'

const carRoutes = Router();

carRoutes.get("/", getAllCars)
carRoutes.get("/:id", getOneCar)
carRoutes.put("/:id", isAthenicated, carValidationRules(), validate, updateCar)
carRoutes.post("/",isAthenicated, carValidationRules(),validate,addCar);
carRoutes.delete("/:id", isAthenicated, deleteCar);

export { carRoutes };
