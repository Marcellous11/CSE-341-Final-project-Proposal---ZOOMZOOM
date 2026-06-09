import mongoose from 'mongoose'
import { getSuvModel } from "../data/db.js";
import {ObjectId} from 'mongodb'

async function getAllSuvs(req, res) {
    //#swagger.tags=['SUVs']
    /* #swagger.security = [{ "BearerAuth": [] }] */
    try {
        const suvModel = await getSuvModel()
        const suvs = await suvModel.find()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(suvs)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function getSuv(req, res) {
    //#swagger.tags=['SUVs']
    /* #swagger.security = [{ "BearerAuth": [] }] */
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const suvModel = await getSuvModel()
        const suv = await suvModel.findById(req.params.id)

        if (!suv) {
            return res.status(404).json('This SUV is not found in the database.')
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(suv)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function putSuv(req, res) {
    //#swagger.tags=['SUVs']
    /* #swagger.security = [{ "BearerAuth": [] }] */
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const suvModel = await getSuvModel()
        const suv = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            miles: req.body.miles,
            color: req.body.color,
            drive_type: req.body.drive_type,
            new: req.body.new,
            country: req.body.country
        }
        const response = await suvModel.findByIdAndUpdate(req.params.id, suv, {
            new: true,
            runValidators: true
        })
        if (response) {
            res.status(204).send()
        } else {
            res.status(404).json('This SUV is not found in the database, so it cannot be updated.')
        }
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while updating the SUV.')
    }
}

async function addSuv(req,res,next){
/* #swagger.tags=['SUVs'] */
/* #swagger.security = [{ "BearerAuth": [] }] */
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
/* #swagger.security = [{ "BearerAuth": [] }] */
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

export { getAllSuvs, getSuv, putSuv, addSuv, deleteSuv }
