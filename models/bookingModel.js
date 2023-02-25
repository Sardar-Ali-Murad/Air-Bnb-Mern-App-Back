import mongoose from "mongoose";

let BookingModel=new mongoose.Schema(({
    place:{
        type:mongoose.Types.ObjectId,
        ref:"AirBnbPlaces"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"AirBnbUsers"
    },
    startDate:{
        type:Date,
        required:[true,"Please Prvode the Start Date"]
    },
    endDate:{
        type:Date,
        required:[true,"Please Provide the end date"]
    },
    totalGuests:{
       type:Number,
       required:[true,"How Many Guest You'll Come With"]
    }
}))

export default mongoose.model("AirBnbBookings",BookingModel)