import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsControllers";

const router = Router();

router.route("/").get(getProducts).post(addProduct);

router.route("/:id").get(getProductById).delete(deleteProduct);

export default router;
