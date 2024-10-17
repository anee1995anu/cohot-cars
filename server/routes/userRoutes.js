import e from "express";
import { allUsers, checkUser, userLogin, userLogout, userProfile, userSignup, userUpdate } from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";
import { authAdmin } from "../middlewares/authAdmin.js";
const router = e.Router();

router.post("/sign-up", userSignup);

router.post("/log-in", userLogin);

router.get("/profile", authUser, userProfile);

router.put("/profile-update/:id", authUser,userUpdate );

router.delete("/profile-delete",authUser, (req, res, next) => {});

router.post("/log-out", authUser, userLogout);

router.get("/check-user", authUser,checkUser);
router.get("/all-users",authAdmin,allUsers)



export { router as userRouter };