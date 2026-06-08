import { Router } from "express";
import { validate, carValidationRules } from '../middleware/validator.js'
import {
  getAllTrucks,
  getOneTruck,
  updateTruck
} from "../controllers/truck.js";
import { isAthenicated } from '../middleware/authenicate.js'

const truckRoutes = Router();

truckRoutes.get("/", getAllTrucks)
truckRoutes.get("/:id", getOneTruck)
truckRoutes.put("/:id", isAthenicated, carValidationRules(), validate, updateTruck)

export { truckRoutes };
