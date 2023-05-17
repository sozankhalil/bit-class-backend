import Users from "../models/users.model.js";
import Product from "../models/product.models.js";
import Categories from "../models/categories.model.js";

export const signup = async (req, res) => {
    try {
        res.json({
            status: 'success', data: req.user,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', data: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json({ status: 'success', results: users.length, data: users });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', data: error.message });

    }
}
export const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);


        await Categories.findByIdAndUpdate(req.body.category, {
            $push: { user: user._id }
        });
        res.json({ status: 'success', results: user.length, data: user });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', data: error.message });

    }
}
export const getCurrentUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user.sub);
        res.json({ status: 'success', data: { user } })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', data: error })
    }
}

export const login = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("no user found");
                next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = { sub: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                res.json({ token });
            });
        } catch (err) { }
    })(req, res, next);
};