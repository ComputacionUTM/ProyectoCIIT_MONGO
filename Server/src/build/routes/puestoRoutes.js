"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puestoController_1 = require("../controllers/puestoController");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', puestoController_1.puestoController.createPuesto);
        this.router.get('/', puestoController_1.puestoController.list);
        this.router.post('/restricciones', puestoController_1.puestoController.listRestricciones);
        this.router.post('/rango', puestoController_1.puestoController.listRango);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
