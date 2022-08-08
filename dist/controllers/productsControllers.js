"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
class ProductsController {
    constructor() {
        this.getProducts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.container.getItem();
            if (!data) {
                res.status(404).json({
                    message: "Product not found",
                });
            }
            else {
                res.json(data);
            }
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newProduct = Object.assign(Object.assign({}, req.body), { timestamp: Date.now(), precio: Number(req.body.precio) });
            const id = yield this.container.addProduct(newProduct);
            if (!id) {
                res.status(500).json({
                    message: "Error saving product",
                });
            }
            res.status(201).json({
                message: "Product added",
                id,
            });
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Bad Request: Check yours params" });
                return;
            }
            const data = yield this.container.getItem(Number(id));
            if (!data) {
                res.status(404).json({
                    message: "Product not found",
                });
            }
            else {
                res.json(data);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.container.deleteById(Number(id));
                res.json({
                    message: "Product deleted",
                });
            }
            catch (error) {
                res.status(400).json({
                    message: "Error deleting product",
                });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Bad Request: Check yours params" });
                return;
            }
            const newProduct = Object.assign(Object.assign({}, req.body), { precio: Number(req.body.precio) });
            try {
                yield this.container.updateProduct(Number(id), newProduct);
                res.json({
                    message: "Product updated",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        message: error.message,
                    });
                }
            }
        });
        this.getProducts = this.getProducts;
        this.addProduct = this.addProduct;
        this.getProductById = this.getProductById;
        this.deleteProduct = this.deleteProduct;
        this.updateProduct = this.updateProduct;
        this.container = new product_1.default("products", ".json");
    }
}
exports.default = ProductsController;
//# sourceMappingURL=productsControllers.js.map