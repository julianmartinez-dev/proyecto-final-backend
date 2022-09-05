import "dotenv/config";

import { Router } from "express";

import { connectFirebase } from "../config/connections";
import CartController from "../controllers/cartControllers";
import CartDaoFirebase from "../daos/carts/CartDaoFirebase";
import CartsDaoMongo from "../daos/carts/CartDaoMongo";
import CartsDaoFile from "../daos/carts/CartsDaoFile";
import CartsDaoMemory from "../daos/carts/CartsDaoMemory";
import {
  validateAddProduct,
  validateCart,
} from "../middlewares/validation/cartValidations";

const router = Router();
let daoCart;
switch (process.env.PERSISTENCE) {
  case "json":
    daoCart = new CartsDaoFile();
    break;
  case "mongodb":
    daoCart = new CartsDaoMongo();
    break;
  case "firebase":
    daoCart = new CartDaoFirebase();
    connectFirebase();
    break;
  default:
    daoCart = new CartsDaoMemory();
    break;
}
const cc = new CartController(daoCart);

router.route("/").post(validateCart, cc.createCart);

router.route("/:id").delete(cc.deleteCart);

router
  .route("/:id/productos")
  .get(cc.getProducts)
  .post(validateAddProduct, cc.addProduct);

router.route("/:id/productos/:id_prod").delete(cc.deleteProduct);

export default router;
