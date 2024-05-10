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
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearEmpresa/', empresasController_1.empresasController.createEmpresa);
        this.router.get('/MostrarTodasEmpresas/', empresasController_1.empresasController.mostrar_todos_empresa);
        this.router.put('/actualizarEmpresa/:id', empresasController_1.empresasController.actualizarEmpresa);
        this.router.delete('/eliminarEmpresa/:id', empresasController_1.empresasController.eliminarEmpresa);
        this.router.get('/ListOneEmpresa/:id', empresasController_1.empresasController.listOne);
        this.router.put('/actualizarFotito/:id', empresasController_1.empresasController.actualizarFotito);
    }
}
const empresasRoutes = new EmpresasRoutes();
exports.default = empresasRoutes.router;
