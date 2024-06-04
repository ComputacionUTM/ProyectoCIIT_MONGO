"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RedSocialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
    }
}
const redSocialRoutes = new RedSocialRoutes();
exports.default = redSocialRoutes.router;
