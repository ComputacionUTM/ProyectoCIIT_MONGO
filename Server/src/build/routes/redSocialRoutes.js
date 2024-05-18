"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redSocialController_1 = require("../controllers/redSocialController");
class RedSocialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.delete('/eliminarRed/:id', redSocialController_1.redSocialController.eliminarRed);
    }
}
const redSocialRoutes = new RedSocialRoutes();
exports.default = redSocialRoutes.router;
