import e from "express";
import { userRouter } from "./userRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { carRouter } from "./carRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
const router = e.Router();


router.use('/user',userRouter)
router.use('/admin',adminRouter)
router.use('/car',carRouter)
router.use('/cart',cartRouter)
router.use('/review',reviewRouter)


export {router as apiRouter}