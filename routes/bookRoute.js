import express from "express"
let router=express.Router()

import {createBooking,deleteBookings,getCurrentUserBooking} from "../controllers/bookingController.js"

router.route("/").post(createBooking)
router.route("/:bookId").delete(deleteBookings)
router.route("/currentUserBookings").get(getCurrentUserBooking)

export default router