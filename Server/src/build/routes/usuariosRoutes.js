"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosController_1.usuariosController.mostrar_todos_usuarios);
        this.router.get('/obtenerUsuario/:id', usuariosController_1.usuariosController.listOne);
        this.router.post('/', usuariosController_1.usuariosController.createUsuario);
        this.router.delete('/:id', usuariosController_1.usuariosController.borrarUsuario);
        this.router.put('/:id', usuariosController_1.usuariosController.actualizarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
