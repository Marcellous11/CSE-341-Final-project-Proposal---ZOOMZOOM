import mongoose from 'mongoose'

const vehicleSchema = mongoose.Schema(
    {
        make: String,
        model:String,
        year: String,
        miles: String,
        color: String,
        drive_type: String,
        new: Boolean,
        country: String
    },

)

const userSchema = mongoose.Schema(
    {
        user_id: Number,
        user_name: String,
        user_password: String,
    }
)

const Car = mongoose.model("car",vehicleSchema)
const Truck = mongoose.model("truck",vehicleSchema)
const Suv = mongoose.model("suv",vehicleSchema)
const User = mongoose.model("user",userSchema)

async function ConnectDatabase(){
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("Database connected")

}

async function getCarModel(){
    if(mongoose.connection.readyState != 1){
        throw new Error("Model is not connected")
    }
    return Car
}

async function closeDatabase(){
   await mongoose.disconnect()
}

export {ConnectDatabase,getCarModel,closeDatabase}