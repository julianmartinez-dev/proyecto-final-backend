/* eslint-disable prettier/prettier */
import { Router } from "express";

import ProductsController from "../controllers/productsControllers";
import { validateAddProduct } from '../middlewares/productsValidations';

const router = Router();
const pc = new ProductsController();

router
    .route("/")
    .get(pc.getProducts)
    .post(validateAddProduct,pc.addProduct);

router.route("/:id").get(pc.getProductById).delete(pc.deleteProduct);

export default router;
