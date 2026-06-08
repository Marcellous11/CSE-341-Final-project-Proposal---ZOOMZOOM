import mongoose from 'mongoose'
import { getSuvModel } from "../data/db.js";
import {ObjectId} from 'mongodb'

async function getAllSuvs(req, res) {
    //#swagger.tags=['SUVs']
    try {
        const suvModel = await getSuvModel()
        const suvs = await suvModel.find()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(suvs)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function addSuv(req,res,next){
/* #swagger.tags=['SUVs'] */
  try {
    const suvModel = await getSuvModel();
    const suv = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      miles: req.body.miles,
      color: req.body.color,
      drive_type: req.body.drive_type,
      new: req.body.new,
      country: req.body.country,
    };

    const response = await suvModel.create(suv);

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

async function deleteSuv(req,res,next){
/* #swagger.tags=['SUVs'] */
try {
    const suvId = new ObjectId(req.params.id);

    const suvModel = await getSuvModel();

    const response = await suvModel.deleteOne({ _id: suvId });

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

export { getAllSuvs, addSuv, deleteSuv }
