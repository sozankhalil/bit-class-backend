import passport from "passport";
import { Strategy as localStrategy } from "passport-local";

import Users from "../models/users.model.js";

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField:'password',
            passReqToCallback:true,
        },
        async (req, email, password, done)=>{
            try {
                const user = await User.create({
                    email,
                    password,

                });
                return done(null, user);
            } catch (error) {
                done(error);
 
            }
        }
           
        
    )
)