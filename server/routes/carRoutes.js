import e from "express";
import {authUser} from "../middlewares/authUser.js"
import {authAdmin} from "../middlewares/authAdmin.js"
import { createCar, deleteCar, fetchCarDetails, findAllCars, updateCar } from "../controllers/carController.js";
import { upload } from "../middlewares/multer.js";

const router=e.Router();





router.get("/all-cars",authUser, findAllCars);
router.get("/carDetails/:id", authUser, fetchCarDetails);
router.post("/create", authAdmin, upload.single('image'), createCar);
router.put("/update/:id",authAdmin,upload.single("image"), updateCar);
router.delete("/delete/:id",authAdmin,deleteCar);

export { router as carRouter };