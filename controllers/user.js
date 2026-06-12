import mongoose from 'mongoose'
import { getUserModel } from '../data/db.js'
import { ObjectId } from 'mongodb'

async function getAllUsers(req, res) {
    //#swagger.tags=['Users']
    try {
        const userModel = await getUserModel()
        const users = await userModel.find()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

async function addUser(req,res,next){
/* #swagger.tags=['Users'] */
  try {
    const userModel = await getUserModel();
    const user = {
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      user_password: req.body.user_password,
    };

    const response = await userModel.create(user);

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

async function deleteUser(req,res,next){
/* #swagger.tags=['Users'] */
try {
    const userId = new ObjectId(req.params.id);

    const userModel = await getUserModel();

    const response = await userModel.deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(Response.error || "Some error occured while deleting car");
    }
  } catch (err) {
    next(err);
  }
};


export { getAllUsers, deleteUser , addUser }