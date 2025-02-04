import {Router} from "express";
import {registerUser, loginUser,getRegisterUser,getLoginUser} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").get(getRegisterUser);

router.route("/login").get(getLoginUser);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);


export default router