import Book from "../models/bookingModel.js";
import User from "../models/User.js";
import Place from "../models/placeModel.js";
import { StatusCodes } from "http-status-codes";

import {
    BadRequestError,
  UnAuthenticatedError,
} from "../errors/index.js";

export const createBooking = async (req, res) => {
  let alreadyBooked = await Book.findOne({
    user: req.user.userId,
    place: req.body.place,
  });

  if (alreadyBooked) {
    throw new BadRequestError("The place is already booked for you");
  }

  
  if(!req.body.startDate || !req.body.endDate){
      throw new BadRequestError("Plases Privide All the date")
  }


    let todayDate=new Date()
    let startingDate=new Date(req.body.startDate)
    let endingDate=new Date(req.body.endDate)

    if(startingDate<todayDate || endingDate<=todayDate){
      throw new BadRequestError("Both the date must be in the future not in past")
    }


  if(endingDate<startingDate){
    throw new BadRequestError("The End Date Must be greater than the Start Date")
  }

  
  req.body.user = req.user.userId;
  
  if(req.body.totalGuests<1){
    throw new BadRequestError("The Total Guest Must Be More Than 1")
  }


  let Booking = await Book.create({user:req.user.userId,startDate:startingDate,endDate:endingDate,totalGuests:req.body.totalGuests,place:req.body.place});

  res.status(StatusCodes.CREATED).json({ msg: "Success", Booking });
};

export const getCurrentUserBooking = async (req, res) => {
  let userBookings = await Book.find({ user: req.user.userId }).populate(
    "place"
  );
  res.status(StatusCodes.OK).json({ userBookings });
};

export const deleteBookings = async (req, res) => {
  let { bookId } = req.params;

  let userBooking = await Book.findOne({
    _id: bookId,
    user: req.user.userId,
  });

  if (!userBooking) {
    throw new UnAuthenticatedError("This access is Un-Authorized for you");
  }

  await userBooking.remove();

  res.status(StatusCodes.OK).json({ msg: "Success" });
};
