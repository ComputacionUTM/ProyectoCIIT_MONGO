"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresasController_1 = require("../controllers/empresasController");
class EmpresasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', empresasController_1.empresaController.createEmpresa);
        /*this.router.get('/obtenerUsuario/:id',empresaController.listOne);
        this.router.post('/', empresaController.createUsuario);
        this.router.delete('/:id',empresaController.borrarUsuario);
        this.router.put('/:id',empresaController.actualizarUsuario);*/
    }
}
const empresasRoutes = new EmpresasRoutes();
exports.default = empresasRoutes.router;
