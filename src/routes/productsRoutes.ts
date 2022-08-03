import { Router } from "express";

import ProductsController from "../controllers/productsControllers";

const router = Router();
const pc = new ProductsController();

router.route("/").get(pc.getProducts).post(pc.addProduct);

router.route("/:id").get(pc.getProductById).delete(pc.deleteProduct);

export default router;
