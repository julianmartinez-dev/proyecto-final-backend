/* eslint-disable prettier/prettier */
import { Router } from "express";

import ProductsController from "../controllers/productsControllers";
import { validateProduct } from '../middlewares/validation/productsValidations';

const router = Router();
const pc = new ProductsController();

router
    .route("/")
    .get(pc.getProducts)
    .post(validateProduct,pc.addProduct);

router
.route("/:id")
.get(pc.getProductById)
.delete(pc.deleteProduct)
.put(validateProduct,pc.updateProduct);

export default router;
