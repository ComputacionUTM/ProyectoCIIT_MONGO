"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const auth_1 = require("../middleware/auth");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', loginController_1.loginController.crearUsuario);
        this.router.post('/login', loginController_1.loginController.login);
        this.router.get('/logout', loginController_1.loginController.logout);
        this.router.get('/perfil', auth_1.validarToken, loginController_1.loginController.perfil);
        /*this.router.post('/', empresaController.createUsuario);
        this.router.delete('/:id',empresaController.borrarUsuario);
        this.router.put('/:id',empresaController.actualizarUsuario);*/
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
