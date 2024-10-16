


import express from "express"
import { adminLogin, adminLogout, adminProfile, adminSignup, checkAdmin } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
const router=express.Router();



router.post("/sign-up", adminSignup);

router.post("/log-in", adminLogin);

router.get("/profile",authAdmin, adminProfile);

router.post("/log-out", authAdmin,adminLogout);

router.get("/check-admin",authAdmin,checkAdmin);


export {router as adminRouter}
