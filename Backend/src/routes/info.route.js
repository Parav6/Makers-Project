import {Router} from "express";
import {submitInfo,getShowInfo} from "../controllers/info.controller.js";
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

 
router.route("/show").get(getShowInfo)

export default router