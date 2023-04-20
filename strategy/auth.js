import passport from "passport";
import { Strategy as localStrategy } from "passport-local";

import Users from "../models/users.model.js";

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {

                const user = await Users.create({
                    username,
                    password,
                });
                return done(null, user);
            } catch (error) {
                done(error);

            }
        }
    )
)
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await Users.findOne({ username });
                if (!user) return done(null, false, { message: "invalid credentials" });
                const validate = user.isValidPassword(password);
                if (!validate) return done(null, false, { message: "invalid credentials" });
                return done(null, false, { message: 'logged in successfuly' })
            } catch (error) {

            }

        }
    )
);