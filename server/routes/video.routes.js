import {Router} from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';

import { getAllVideos } from '../controllers/video.controller.js';
const router = Router();

router.route('/getAllVideos').get(verifyJWT, getAllVideos)

export default router;