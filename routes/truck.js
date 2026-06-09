import { Router } from "express";
import { validate, carValidationRules } from '../middleware/validator.js'
import {
  getAllTrucks,
  getOneTruck,
  updateTruck,
  addTruck,
  deleteTruck
} from "../controllers/truck.js";
import { isAuthenticated } from '../middleware/authenicate.js'

const truckRoutes = Router();

truckRoutes.get("/", isAuthenticated, getAllTrucks)
truckRoutes.get("/:id", isAuthenticated, getOneTruck)
truckRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, updateTruck)
truckRoutes.post("/", isAuthenticated, carValidationRules(), validate, addTruck);
truckRoutes.delete("/:id", isAuthenticated, deleteTruck);

export { truckRoutes };
