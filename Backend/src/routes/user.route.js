import {Router} from "express";
import {registerUser, loginUser,verifyUser,logOutUser,showLogin} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();



router.route("/register").post(registerUser);
// router.route("/").get(showLogin);

router.route("/login").post(loginUser);

router.route("/verify").post(verifyJWT,verifyUser);

router.route("/logout").post(verifyJWT,logOutUser);

export default router