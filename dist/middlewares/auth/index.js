"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    var _a;
    if (((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) === "admin") {
        return next();
    }
    return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to access this route",
    });
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map