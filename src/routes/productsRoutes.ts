/* eslint-disable prettier/prettier */
import { Router } from "express";

import ProductsController from "../controllers/productsControllers";
import { isAuthenticated } from '../middlewares/auth/index';
import { validateProduct } from '../middlewares/validation/productsValidations';

const router = Router();
const pc = new ProductsController();

router
    .route("/")
    .get(pc.getProducts)
    .post(isAuthenticated,validateProduct,pc.addProduct);

router
.route("/:id")
.get(pc.getProductById)
.delete(isAuthenticated,pc.deleteProduct)
.put(isAuthenticated,validateProduct,pc.updateProduct);

export default router;
