"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Container {
    constructor(fileName, fileExtension) {
        this.fileName = fileName;
        this.fileExtension = fileExtension;
        this.file = fileName + fileExtension;
        if (fs_1.default.existsSync(this.file))
            return;
        fs_1.default.promises.writeFile(this.file, JSON.stringify([]));
    }
}
exports.default = Container;
//# sourceMappingURL=container.js.map