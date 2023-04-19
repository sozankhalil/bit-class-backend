
import Categories from "../models/categories.model.js";
import Product from "../models/product.models.js";

export const createCategory = async (req,res) =>{
    try {
       const categories = await Categories.create(req,res);
        res.json({ status: 'success', data: categories });

    } catch (error) {
        res.status(400).json({ status: 'error', data: error.message });

    }
};

export const getCategories = async (req,res) =>{
    try {
        const categories = await Categories.find().populate('products');
        res.json({ status: 'success', results:categories.length, data: categories });

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 'error', data: error.message });

    }
}

export const registerCategory = async (req,res)=>{
    try {
        const categories = await Categories.findByIdAndUpdate(
            req.params.id,
            {
                $push: {products: req.body.ProductId}
            },
            {
                new: true,
            }
        );
        await Product.findByIdAndUpdate(req.body.productId,{
            $push: {categories: req.params.id}
        });
        res.json({ status: "success", data: categories });

    } catch (error) {
        res.status(400).json({ status: 'error', data: error.message });

    }
}