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
const cart_1 = __importDefault(require("../models/cart"));
class CartController {
    constructor() {
        this.createCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cart = req.body;
            const newCart = Object.assign(Object.assign({}, cart), { timestamp: Date.now() });
            const id = yield this.container.createCart(newCart);
            res.status(201).json({
                message: "Cart created",
                id,
            });
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({
                    message: "Invalid id",
                });
                return;
            }
            const cart = yield this.container.getCart(Number(id));
            if (!cart) {
                res.status(404).json({
                    message: "Cart not found",
                });
                return;
            }
            try {
                yield this.container.addProductToCart(cart, req.body);
                res.status(200).json({
                    message: "Product added to cart",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, id_prod } = req.params;
            if (!id || isNaN(Number(id)) || !id_prod || isNaN(Number(id_prod))) {
                res.status(400).json({
                    message: "Invalid id, check your params",
                });
                return;
            }
            const cart = yield this.container.getCart(Number(id));
            if (!cart) {
                res.status(404).json({
                    message: "Cart not found",
                });
                return;
            }
            try {
                yield this.container.deleteProductFromCart(cart, Number(id_prod));
                res.status(200).json({
                    message: "Product deleted from cart",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            }
        });
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield this.container.getCart(Number(id));
            if (!data) {
                res.status(404).json({
                    message: "Cart not found",
                });
            }
            else {
                res.json(data.productos);
            }
        });
        this.deleteCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.container.deleteById(Number(id));
                res.json({
                    message: "Cart deleted",
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
        this.addProduct = this.addProduct;
        this.deleteProduct = this.deleteProduct;
        this.createCart = this.createCart;
        this.getProducts = this.getProducts;
        this.deleteCart = this.deleteCart;
        this.container = new cart_1.default("carts", ".json");
    }
}
exports.default = CartController;
//# sourceMappingURL=cartControllers.js.map