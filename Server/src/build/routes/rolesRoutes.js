"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', rolesController_1.rolesController.createRol);
        this.router.get('/obtenerRol/:id', rolesController_1.rolesController.listOne);
        this.router.put('/:id', rolesController_1.rolesController.actualizarRol);
        this.router.get('/', rolesController_1.rolesController.mostrarRoles);
        this.router.delete('/eliminaRol/:id', rolesController_1.rolesController.deleteRol);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
