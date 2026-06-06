import mongoose from 'mongoose'
import { getCarModel } from '../data/db.js'

const getAllCars = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carModel = getCarModel()
        const cars = await carModel.find()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(cars)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

const getOneCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const carModel = getCarModel()
        const car = await carModel.findById(req.params.id)

        if (!car) {
            return res.status(404).json('This car is not found in the database.')
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(car)
    } catch (err) {
        res.status(400).json({ message: err })
    }
        
}

const updateCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const carModel = getCarModel()
        const car = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            miles: req.body.miles,
            color: req.body.color,
            drive_type: req.body.drive_type,
            new: req.body.new,
            country: req.body.country
        }
        const response = await carModel.findByIdAndUpdate(req.params.id, car, {
            new: true,
            runValidators: true
        })
        if (response) {
            res.status(204).send()
        } else {
            res.status(404).json('This car is not found in the database, so it cannot be updated.')
        }
    } catch (err) {
        res.status(500).json(response.err || 'Some error occurred while updating the Car.')
    }
}

export default { getAllCars, getOneCar, updateCar }