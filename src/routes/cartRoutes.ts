/* eslint-disable prettier/prettier */
import { Router } from "express";

import CartController from "../controllers/cartControllers";
import CartsDaoFile from "../daos/carts/CartsDaoFile";
import { validateAddProduct,validateCart } from '../middlewares/validation/cartValidations'

const router = Router();
const cartContainer = new CartsDaoFile('carts.json');
const cc = new CartController(cartContainer);

router
    .route("/")
    .post(validateCart,cc.createCart);

router
    .route("/:id")
    .delete(cc.deleteCart);

router
  .route('/:id/productos')
  .get(cc.getProducts)
  .post(validateAddProduct, cc.addProduct);

router
    .route("/:id/productos/:id_prod")
    .delete(cc.deleteProduct);

export default router;
