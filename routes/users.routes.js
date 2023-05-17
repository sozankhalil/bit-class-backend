import { Router } from "express";
import passport from "passport";
import { getUsers, signup, getCurrentUser } from "../controllers/user.controller.js";
import { isAdmin, loginMiddleware, protect } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").get(getUsers);
router.route('/signup').post(passport.authenticate('signup', { session: false }), signup);
router.post('/login', loginMiddleware)
router.route('/currentuser').get(protect, isAdmin, getCurrentUser)
export default router;
