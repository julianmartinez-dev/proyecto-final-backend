import "dotenv/config";

import { Router } from "express";

import ProductsController from "../controllers/productsControllers";
import ProductsDaoFirebase from "../daos/products/ProductDaoFirebase";
import ProductsDaoFile from "../daos/products/ProductsDaoFile";
import ProductsDaoMemory from "../daos/products/ProductsDaoMemory";
import ProductsDaoMongo from "../daos/products/ProductsDaoMongo";
import { isAuthenticated } from "../middlewares/auth/index";
import { validateProduct } from "../middlewares/validation/productsValidations";

const router = Router();

let daoProduct;
switch (process.env.PERSISTENCE) {
  case "json":
    daoProduct = new ProductsDaoFile();
    console.log("Using JSON persistence");
    break;
  case "mongodb":
    daoProduct = new ProductsDaoMongo();
    console.log("Using MongoDB persistence");
    break;
  case "firebase":
    daoProduct = new ProductsDaoFirebase();
    console.log("Using Firebase persistence");
    break;
  default:
    daoProduct = new ProductsDaoMemory();
    console.log("Using Memory persistence");
    console.log(process.env.PERSISTENCE);
    break;
}
const pc = new ProductsController(daoProduct);

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
