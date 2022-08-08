"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = require("express");
const cartControllers_1 = __importDefault(require("../controllers/cartControllers"));
const cartValidations_1 = require("../middlewares/validation/cartValidations");
const router = (0, express_1.Router)();
const cc = new cartControllers_1.default();
router
    .route("/")
    .post(cartValidations_1.validateCart, cc.createCart);
router
    .route("/:id")
    .delete(cc.deleteCart);
router
    .route('/:id/productos')
    .get(cc.getProducts)
    .post(cartValidations_1.validateAddProduct, cc.addProduct);
router
    .route("/:id/productos/:id_prod")
    .delete(cc.deleteProduct);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map