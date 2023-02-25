import mongoose from "mongoose";

let placeSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:[true,"Please Provide the title"]
    },
    Address:{
        type:String,
        required:[true,"Please Provide the Address"]
    },
    Description:{
        type:String,
        required:[true,"Please Provide the description"]
    },
    extraInfo:{
        type:String,
        required:[true,"Please Provide the extraInfo"]
    },
    Photos:{
        type:Array,
        required:[true,"Please Provide the photos"]
    },
    freeParking:{
        type:Boolean,
        default:false
    },
    Wifi:{
        type:Boolean,
        default:false
    },
    Pets:{
        type:Boolean,
        default:false
    },
    Radio:{
        type:Boolean,
        default:false
    },
    TV:{
        type:Boolean,
        default:false
    },
    privateEntrance:{
        type:Boolean,
        default:false
    },
    Price:{
        type:Number,
        required:[true,"Please Provide the price of the place"]
    },
    totalGuests:{
        type:Number,
        required:[true,"How many guest the place can accomodate"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"AirBnbUsers"
    }
},{timestamps:true})


export default mongoose.model("AirBnbPlaces",placeSchema)