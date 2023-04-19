import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    category: { type: String, required: true },

    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }]
})

const Categories = mongoose.model('category', categoriesSchema);

export default Categories;