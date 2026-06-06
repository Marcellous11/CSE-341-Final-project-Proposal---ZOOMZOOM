import { Router } from "express";
import {validate,carValidationRules} from '../middleware/validator.js'
import {
  addCar,
  deleteCar
} from "../controllers/car.js";
import {isAthenicated} from '../middleware/authenicate.js'

const carRoutes = Router();

carRoutes.post("/",isAthenicated, carValidationRules(),validate,addCar);
carRoutes.delete("/:id", isAthenicated, deleteCar);

export { carRoutes };
