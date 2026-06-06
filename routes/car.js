import { Router } from 'express'
const router = Router()

import carController from '../controllers/car.js'

router.get("/", carController.getAllCars)

router.get("/:id", carController.getOneCar)

router.put("/:id", carController.updateCar)

export default router