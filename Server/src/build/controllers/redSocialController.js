"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redSocialController = void 0;
const database_1 = require("../database"); //acceso a la base de datos
class RedSocialController {
    constructor() {
        (0, database_1.connectDB)();
    }
}
exports.redSocialController = new RedSocialController();
