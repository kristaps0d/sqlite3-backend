// General imports
import { Router } from "express"
const router = Router();

// Module imports
import { 
    newsession,
    valsession,
    refsession,
    clearsession,
    getuser
} from "./modules/handler.js";


router.post("/oauth/create", newsession);
router.get("/oauth/validate", valsession);
router.get("/oauth/refresh", refsession);
router.get("/oauth/clear", clearsession);

router.get("/session/user", getuser);


export default router;