import mongoose from 'mongoose'

const carScheme = mongoose.Schema(
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
    {
        collection:"car"
    }
)

const likesScheme = mongoose.Schema(
    {
        user_id: Number,
        car_id: Number,
    },
    {
        collection:"likes"
    }
)

const trucksScheme = mongoose.Schema(
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
    {
        collection:"trucks"
    }
)

const userScheme = mongoose.Schema(
    {
        user_id: Number,
        user_name: String,
        user_password: String,
    },
    {
        collection:"user"   
    }
)

const Car = mongoose.model("car",carScheme)

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