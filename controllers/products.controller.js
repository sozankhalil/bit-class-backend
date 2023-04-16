import Product from "../models/product.models.js";

export const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json({ status: 'success', data: product });
    }
    catch (err) {
        res.status(400).json({ status: 'error', data: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        let query = JSON.stringify(req.query);
        query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
        console.log(req.query)
        const products = await Product.find(JSON.parse(query))
        res.json({ status: "success", results: products.length, data: products });
    }
    catch (err) {
        res.status(400).json({ status: 'error', data: err.message });
    }
}

