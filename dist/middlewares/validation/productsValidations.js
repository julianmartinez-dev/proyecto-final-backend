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
exports.validateProduct = void 0;
const express_validator_1 = require("express-validator");
const validateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("nombre", "El nombre es requerido").notEmpty().run(req);
    yield (0, express_validator_1.check)("precio", "El precio es requerido").notEmpty().isNumeric().withMessage('El precio debe expresarse en numero').run(req);
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
exports.validateProduct = validateProduct;
//# sourceMappingURL=productsValidations.js.map