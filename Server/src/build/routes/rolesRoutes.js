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
        //this.router.get('/mostrarTodosRoles/',(req,res) => res.send('probando Roles'));
        this.router.get('/mostrarTodosRoles/', rolesController_1.rolesController.mostrar_todos_roles);
        this.router.get('/obtenerRol/:id', rolesController_1.rolesController.listOne);
        this.router.post('/crearRol/', rolesController_1.rolesController.createRol);
        this.router.put('/actualizarRol/:id', rolesController_1.rolesController.actualizarRol);
        this.router.delete('/eliminarRol/:id', rolesController_1.rolesController.eliminarRol);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
