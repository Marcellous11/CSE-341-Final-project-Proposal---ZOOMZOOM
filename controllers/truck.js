import mongoose from 'mongoose'
import { getTruckModel } from "../data/db.js";
import {ObjectId} from 'mongodb'

async function getAllTrucks(req, res) {
    //#swagger.tags=['Trucks']
    try {
        const truckModel = await getTruckModel()
        const trucks = await truckModel.find()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(trucks)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function getOneTruck(req, res) {
    //#swagger.tags=['Trucks']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const truckModel = await getTruckModel()
        const truck = await truckModel.findById(req.params.id)

        if (!truck) {
            return res.status(404).json('This truck is not found in the database.')
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(truck)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function updateTruck(req, res) {
    //#swagger.tags=['Trucks']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const truckModel = await getTruckModel()
        const truck = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            miles: req.body.miles,
            color: req.body.color,
            drive_type: req.body.drive_type,
            new: req.body.new,
            country: req.body.country
        }
        const response = await truckModel.findByIdAndUpdate(req.params.id, truck, {
            new: true,
            runValidators: true
        })
        if (response) {
            res.status(204).send()
        } else {
            res.status(404).json('This truck is not found in the database, so it cannot be updated.')
        }
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while updating the Truck.')
    }
}

async function addTruck(req,res,next){
/* #swagger.tags=['Trucks'] */
  try {
    const truckModel = await getTruckModel();
    const truck = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      miles: req.body.miles,
      color: req.body.color,
      drive_type: req.body.drive_type,
      new: req.body.new,
      country: req.body.country,
    };

    const response = await truckModel.create(truck);

    if (response && response._id) {
      res.status(201).json({ id: response._id });
    } else {
      res
        .status(500)
        .json({error: "Some error occured while creating user"});
    }
  } catch (err) {
    next(err);
  }
};

async function deleteTruck(req,res,next){
/* #swagger.tags=['Trucks'] */
try {
    const truckId = new ObjectId(req.params.id);

    const truckModel = await getTruckModel();

    const response = await truckModel.deleteOne({ _id: truckId });

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

export { getAllTrucks, getOneTruck, updateTruck, addTruck, deleteTruck }
