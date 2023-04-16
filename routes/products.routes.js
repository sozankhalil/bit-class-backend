import { Router } from "express";
import { addProduct, getProduct } from '../controllers/products.controller.js'
const router = Router();

router.route("/").post(addProduct).get(getProduct);

export default router;
