import { Router } from "express";
import passport from "passport";
import { getUsers, signup } from "../controllers/user.controller.js";
import { loginMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").get(getUsers);
router.route('/signup').post(passport.authenticate('signup',{session:false}),signup);
router.post('/login', loginMiddleware)
export default router;
