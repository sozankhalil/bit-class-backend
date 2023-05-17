import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTStrategy } from 'passport-jwt'
import { ExtractJwt } from "passport-jwt";
import dotenv from 'dotenv';
import Users from "../models/users.model.js";

dotenv.config();

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

                return done(null, user, { message: 'logged in successfuly' })
            } catch (error) {

            }

        }
    )
);
passport.use(
    new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
)