import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addReview, deleteReview, getAverageRating, getCarReviews } from "../controllers/reviewController.js";

const router = e.Router();

router.post("/add-review",authUser,addReview);
router.get('/get-review/:carId',authUser,getCarReviews)
router.delete('/delete-review/:reviewId',authUser,deleteReview)
router.get('/get-avg-rating/:carId',authUser,getAverageRating)


export { router as reviewRouter };