import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    getProgress,
    updateProgress,
} from "../controllers/progress.controller.js";
const router = Router();

router.use(verifyJWT);
router.route("/:videoId").get(getProgress);
router.route("/:videoId").post(updateProgress);

export default router;
