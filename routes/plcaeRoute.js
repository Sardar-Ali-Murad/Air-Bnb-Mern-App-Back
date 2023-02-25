import express from "express"
let router =express.Router()

import {createPlace,editPlace,getSinglePlace,getAllPlaces,getCurrentUserPlaces} from "../controllers/placesController.js"


router.route("/").post(createPlace).get(getAllPlaces)
router.route("/currentUserPlaces").get(getCurrentUserPlaces)
router.route("/:placeId").patch(editPlace).get(getSinglePlace)

export default router