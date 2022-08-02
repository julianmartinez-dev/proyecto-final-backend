import { Router } from "express";

import {
  addProduct,
  createCart,
  deleteCart,
  deleteProduct,
  getProducts,
} from "../controllers/cartControllers";

const router = Router();

router.route("/").post(createCart);

router.route("/:id").delete(deleteCart);

router.route("/:id/products").get(getProducts).post(addProduct);

router.route("/:id/products/:id_prod").delete(deleteProduct);

export default router;
