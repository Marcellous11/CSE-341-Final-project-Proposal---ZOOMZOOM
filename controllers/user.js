import {getUserModel} from '../data/db.js'

async function addUser(req,res,next){
/* #swagger.tags=['Cars'] */
  try {
    const userModel = await getUserModel();
    const user = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      miles: req.body.miles,
      color: req.body.color,
      drive_type: req.body.drive_type,
      new: req.body.new,
      country: req.body.country,
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
/* #swagger.tags=['Cars'] */
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


export { deleteUser , addUser}