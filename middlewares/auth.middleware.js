import passport from "passport";
import jwt from "jsonwebtoken";


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