import User from "../models/User.js"
import Place from "../models/placeModel.js"

import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError,UnAuthenticatedError}  from "../errors/index.js"


export const createPlace=async (req,res)=>{
    // let {Title,Description,extraInfo,totalGuests,Price,Photos,Address}=req.body

    // if(!Title || !Description || !extraInfo || !totalGuests || !Photos || !Address ||  !Price){
    //     throw new BadRequestError("Please Provide all the values to proceed")
    // }

    req.body.user=req.user.userId

    let place=await Place.create(req.body)

    res.status(StatusCodes.CREATED).json({msg:"success",place})
}


export const editPlace=async (req,res)=>{
    let {placeId}=req.params

    let isAuthenticatedUserPlace=await Place.findOne({_id:placeId,user:req.user.userId})

    if(!isAuthenticatedUserPlace){
        throw new UnAuthenticatedError("This is an Un-Authorized Request")
    }

    const updatedPlace = await Place.findByIdAndUpdate(
        placeId,
        {
          $set: req.body,
        },
        { new: true }
      );


      res.status(StatusCodes.OK).json({msg:"Success",updatedPlace})

}



export const getAllPlaces=async (req,res)=>{
    let Places=await Place.find({}).populate({path:"user",select:"-password"}).sort({createdAt:-1})
    res.status(StatusCodes.OK).json({Places})
}



export const getSinglePlace=async (req,res)=>{
    let {placeId}=req.params
    let singlePlace=await Place.findOne({_id:placeId})
    if(!singlePlace){
        throw new NotFoundError("This place is not present")
    }

    res.status(StatusCodes.OK).json({singlePlace})
}


export const getCurrentUserPlaces=async (req,res)=>{
    let Places=await Place.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({userPlaces:Places})
}