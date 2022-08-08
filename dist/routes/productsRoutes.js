"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = require("express");
const productsControllers_1 = __importDefault(require("../controllers/productsControllers"));
const index_1 = require("../middlewares/auth/index");
const productsValidations_1 = require("../middlewares/validation/productsValidations");
const router = (0, express_1.Router)();
const pc = new productsControllers_1.default();
router
    .route("/")
    .get(pc.getProducts)
    .post(index_1.isAuthenticated, productsValidations_1.validateProduct, pc.addProduct);
router
    .route("/:id")
    .get(pc.getProductById)
    .delete(index_1.isAuthenticated, pc.deleteProduct)
    .put(index_1.isAuthenticated, productsValidations_1.validateProduct, pc.updateProduct);
exports.default = router;
//# sourceMappingURL=productsRoutes.js.map