import { Router } from "express";

import { registerCategory, createCategory, getCategories } from '../controllers/category.controller.js'

const router = Router();
router.route("/").post(createCategory).get(getCategories);
router.route('/registerCategory/:id').patch(registerCategory);

export default router;
