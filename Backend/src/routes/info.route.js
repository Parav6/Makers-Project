import {Router} from "express";
import {submitInfo,showInfo} from "../controllers/info.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";  

const router = Router();

router.route("/submit").post(
    upload.fields([
        {
           name : "screenShort",
           maxCount:1 
        }
    ])
    ,submitInfo);

router.route("/show").post(showInfo)    

export default router