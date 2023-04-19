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
        let qureyObj=JSON.parse(query);
        const excluteQuery=['sort','limit','page','fields'];
        excluteQuery.forEach((key)=>{
            delete qureyObj[key];
        });
        if (req.query.search) {
            queryObj.fullName = new RegExp(req.query.search, "i");
        }
        
        const getQuery= Product.find(qureyObj);
        if(req.query.sort){
            getQuery.sort(req.query.sort);
        }
        if (req.query.fields){
            getQuery.select(req.query.fields);
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = limit * (page-1);
        getQuery.skip(skip).limit(limit);
        
        const products = await getQuery;
        res.json({ status: "success", results: products.length, data: products });
    }
    catch (err) {
        res.status(400).json({ status: 'error', data: err.message });
    }
}

