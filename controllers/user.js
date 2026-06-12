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

async function getOneUser(req, res) {
    //#swagger.tags=['Users']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const userModel = await getUserModel()
        const user = await userModel.findById(req.params.id)

        if (!user) {
            return res.status(404).json('This user is not found in the database.')
        }

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: err })
    }
        
}

async function updateUser(req, res) {
    //#swagger.tags=['Users']
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.')
        }
        const userModel = await getUserModel()
        const user = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            user_password: req.body.user_password
        }
        const response = await userModel.findByIdAndUpdate(req.params.id, user, {
            runValidators: true
        })
        if (response) {
            res.status(204).send()
        } else {
            res.status(404).json('This user is not found in the database, so it cannot be updated.')
        }
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while updating the user.')
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
        .json(Response.error || "Some error occured while deleting user");
    }
  } catch (err) {
    next(err);
  }
};


export { getAllUsers, deleteUser , addUser, getOneUser, updateUser }