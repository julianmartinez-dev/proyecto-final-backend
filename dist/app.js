"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
// Create Express server
const app = (0, express_1.default)();
dotenv_1.default.config();
// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public"), { maxAge: 31557600000 }));
app.use("/api/productos", routes_1.productsRoutes);
app.use("/api/carrito", routes_1.cartRoutes);
app.use("/*", (req, res) => {
    console.log(req.headers);
    res.status(404).json({
        error: "Not found",
        message: `Route: ${req.baseUrl} is not implemented.`,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map