import passport from "passport";
import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";
import CustomError from "../CustomError.js";


export const loginMiddleware = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error("no user found");
                    next(error);
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error);
                    const body = { sub: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
                    res.json({ token })
                });
            } catch (error) { }
        })
        (req, res, next);
};
export const protect = passport.authenticate('jwt', { session: false });

export const isAdmin = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user.sub);
        console.log(req.user)
        if (!user || user.role !== 'admin') {
            return res.status(401).json("not authorized")
        }
        next();
    } catch (error) {
        res.status(400).json(error)
    }
}