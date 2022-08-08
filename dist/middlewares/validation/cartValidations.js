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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddProduct = exports.validateCart = void 0;
const express_validator_1 = require("express-validator");
const validateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("productos")
        .isArray({ min: 1 })
        .withMessage("Debe enviar al menos un producto al carrito")
        .run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next();
});
exports.validateCart = validateCart;
const validateAddProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("id", "El id es requerido")
        .notEmpty()
        .isNumeric()
        .withMessage("El id debe ser numérico")
        .run(req);
    yield (0, express_validator_1.check)("nombre", "El nombre es requerido").notEmpty().run(req);
    yield (0, express_validator_1.check)("precio", "El precio es requerido")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe expresarse en numero")
        .run(req);
    yield (0, express_validator_1.check)("descripcion", "La descripcion es requerida").notEmpty().run(req);
    yield (0, express_validator_1.check)("codigo", "Codigo requerido").notEmpty().run(req);
    yield (0, express_validator_1.check)("foto", "Foto url es requerida").notEmpty().run(req);
    yield (0, express_validator_1.check)("stock", "El stock es requerido")
        .notEmpty()
        .isNumeric()
        .withMessage("Debe ser un valor numérico")
        .run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next();
});
exports.validateAddProduct = validateAddProduct;
//# sourceMappingURL=cartValidations.js.map