import {Router} from 'express';
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT,logoutUser);
router.route('/refresh').post(refreshAccessToken);

export default router;