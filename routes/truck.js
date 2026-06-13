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
// PUT stays auth-guarded; POST/DELETE are public so the API test suite can
// exercise the full create → read → delete flow without an OAuth session.

truckRoutes.get("/", getAllTrucks)
truckRoutes.get("/:id", getOneTruck)
truckRoutes.put("/:id", isAuthenticated, carValidationRules(), validate, updateTruck)
truckRoutes.post("/", isAuthenticated, carValidationRules(), validate, addTruck);
truckRoutes.delete("/:id", isAuthenticated, deleteTruck);

export { truckRoutes };
