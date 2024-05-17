"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticiasController_1 = require("../controllers/noticiasController");
class NoticiasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', noticiasController_1.noticiasController.createNoticia);
        this.router.get('/', noticiasController_1.noticiasController.mostrarNoticias);
        this.router.delete('/:id', noticiasController_1.noticiasController.eliminarNoticia);
    }
}
const noticiasRoutes = new NoticiasRoutes();
exports.default = noticiasRoutes.router;
