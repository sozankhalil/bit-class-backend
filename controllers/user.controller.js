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