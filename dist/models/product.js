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
class ProductContainer extends container_1.default {
    constructor(fileName, fileExtension) {
        super(fileName, fileExtension);
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const productList = yield JSON.parse(document);
                productList.length
                    ? (product.id = productList[productList.length - 1].id + 1)
                    : (product.id = 1);
                productList.push(product);
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(productList, null, 2));
                return product.id;
            }
            catch (error) {
                throw new Error("Error saving file: " + error);
            }
        });
    }
    getItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const products = yield JSON.parse(data);
                return id
                    ? products.find((product) => product.id === id) || null
                    : products;
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
                const products = yield JSON.parse(data);
                const productExist = products.some((p) => p.id === id);
                if (!productExist) {
                    throw new Error("Product doesnt exist");
                }
                const newProductList = products.filter((product) => product.id !== id);
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(newProductList, null, 2));
            }
            catch (error) {
                throw new Error("Error deleting product, " + error);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify([], null, 2));
            }
            catch (error) {
                throw new Error("Error deleting products: " + error);
            }
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.file, "utf-8");
                const products = yield JSON.parse(data);
                const productExist = products.some((p) => p.id === id);
                if (!productExist)
                    throw new Error("Product doesnt exists");
                const newProductList = products.filter((product) => product.id !== id);
                product.id = id;
                newProductList.push(product);
                console.log({ consolelog: 3, newProductList });
                yield fs_1.default.promises.writeFile(this.file, JSON.stringify(newProductList, null, 2));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = ProductContainer;
//# sourceMappingURL=product.js.map