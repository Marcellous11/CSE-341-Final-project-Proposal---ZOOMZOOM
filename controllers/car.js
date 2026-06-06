import { getCarModel } from "../data/db.js";
import {ObjectId} from 'mongodb'

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

export {addCar,deleteCar}