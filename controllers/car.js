import mongoose from 'mongoose'
import { getCarModel } from "../data/db.js";
import {ObjectId} from 'mongodb'

async function getAllCars(req, res) {
    //#swagger.tags=['Cars']
    try {
        const carModel = await getCarModel()
        console.log(carModel)
        const cars = await carModel.find()
        console.log(cars)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(cars)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function getOneCar(req, res) {
    //#swagger.tags=['Cars']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const carModel = await getCarModel()
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

async function updateCar(req, res) {
    //#swagger.tags=['Cars']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const carModel = await getCarModel()
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
        res.status(500).json(err.message || 'Some error occurred while updating the Car.')
    }
}

async function addCar(req,res,next){
/* #swagger.tags=['Cars'] */
  try {
    const carModel = await getCarModel();
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      miles: req.body.miles,
      color: req.body.color,
      drive_type: req.body.drive_type,
      new: req.body.new,
      country: req.body.country,
    };

    const response = await carModel.create(car);

    if (response && response._id) {
      res.status(201).send();
    } else {
      res
        .status(500)
        .json({error: "Some error occured while creating user"});
    }
  } catch (err) {
    next(err);
  }
};

async function deleteCar(req,res,next){
/* #swagger.tags=['Cars'] */
try {
    const carId = new ObjectId(req.params.id);

    const carModel = await getCarModel();

    const response = await carModel.deleteOne({ _id: carId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(Response.error || "Some error occured while creating user");
    }
  } catch (err) {
    next(err);
  }
};

export {addCar, deleteCar, getAllCars, getOneCar, updateCar}
