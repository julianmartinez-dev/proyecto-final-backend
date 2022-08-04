/* eslint-disable prettier/prettier */
import { Router } from "express";

import CartController from "../controllers/cartControllers";
import { validateCart } from '../middlewares/validation/cartValidations'

const router = Router();
const cc = new CartController();

router
    .route("/")
    .post(validateCart,cc.createCart);

router.route("/:id").delete(cc.deleteCart);

router.route("/:id/products").get(cc.getProducts).post(cc.addProduct);

router.route("/:id/products/:id_prod").delete(cc.deleteProduct);

export default router;
