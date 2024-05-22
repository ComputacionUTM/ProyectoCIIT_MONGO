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
        this.router.get('/:salario', puestoController_1.puestoController.listRestriccion);
        this.router.post('/:salario', puestoController_1.puestoController.listRestriccion);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
