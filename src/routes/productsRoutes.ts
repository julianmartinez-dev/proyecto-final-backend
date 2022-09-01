import { Router } from "express";

import ProductsController from "../controllers/productsControllers";
import { productsDao } from "../daos";
import { isAuthenticated } from "../middlewares/auth/index";
import { validateProduct } from "../middlewares/validation/productsValidations";

const router = Router();
const productContainer = productsDao;
const pc = new ProductsController(productContainer);

router
  .route("/")
  .get(pc.getProducts)
  .post(isAuthenticated, validateProduct, pc.addProduct);

router
  .route("/:id")
  .get(pc.getProductById)
  .delete(isAuthenticated, pc.deleteProduct)
  .put(isAuthenticated, validateProduct, pc.updateProduct);

export default router;
