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
const fs_1 = __importDefault(require("fs"));
const container_1 = __importDefault(require("./container"));
class CartContainer extends container_1.default {
    constructor(fileName, fileExtension) {
        super(fileName, fileExtension);
    }
    createCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const cartList = yield JSON.parse(document);
                cartList.length
                    ? (cart.id = cartList[cartList.length - 1].id + 1)
                    : (cart.id = 1);
                cartList.push(cart);
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(cartList, null, 2));
                return cart.id;
            }
            catch (error) {
                throw new Error("Error saving file: " + error);
            }
        });
    }
    getCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const carts = yield JSON.parse(data);
                return carts.find((cart) => cart.id === id) || null;
            }
            catch (error) {
                throw new Error(`Error reading file: ` + error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const carts = yield JSON.parse(data);
                const cartExist = carts.some((c) => c.id === id);
                if (!cartExist) {
                    throw new Error("Cart doesnt exist");
                }
                const newCartList = carts.filter((cart) => cart.id !== id);
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(newCartList, null, 2));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteProductFromCart(cart, productID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const carts = yield JSON.parse(data);
                const newCart = cart.productos.filter((p) => p.id !== productID);
                const newCartList = carts.map((c) => {
                    if (c.id === cart.id) {
                        c.productos = newCart;
                    }
                    return c;
                });
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(newCartList, null, 2));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    addProductToCart(cart, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const carts = yield JSON.parse(data);
                cart.productos.push(product);
                const newCartList = carts.map((c) => {
                    if (c.id === cart.id) {
                        c.productos = cart.productos;
                    }
                    return c;
                });
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(newCartList, null, 2));
            }
            catch (error) { }
        });
    }
}
exports.default = CartContainer;
//# sourceMappingURL=cart.js.map