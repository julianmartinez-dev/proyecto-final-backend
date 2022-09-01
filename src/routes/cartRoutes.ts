import { Router } from "express";

import CartController from "../controllers/cartControllers";
import { cartDao } from "../daos";
import {
  validateAddProduct,
  validateCart,
} from "../middlewares/validation/cartValidations";

const router = Router();
// const cartContainer = new CartsDaoFile('carts.json');

const cartContainer = cartDao;
const cc = new CartController(cartContainer);

router.route("/").post(validateCart, cc.createCart);

router.route("/:id").delete(cc.deleteCart);

router
  .route("/:id/productos")
  .get(cc.getProducts)
  .post(validateAddProduct, cc.addProduct);

router.route("/:id/productos/:id_prod").delete(cc.deleteProduct);

export default router;
