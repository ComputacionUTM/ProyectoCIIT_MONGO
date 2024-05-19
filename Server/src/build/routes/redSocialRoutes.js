"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redSocialController_1 = require("../controllers/redSocialController");
class RedSocialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.delete('/eliminarRed/:id', redSocialController_1.redSocialController.eliminarRed);
        this.router.get('/mostrar_todas_redes', redSocialController_1.redSocialController.mostrar_todas_redes);
        this.router.get('/listOne/:id', redSocialController_1.redSocialController.listOne);
        this.router.post('/crearRed', redSocialController_1.redSocialController.createRedSocial);
        this.router.put('/actualizarRed/:id', redSocialController_1.redSocialController.actualizarRed);
    }
}
const redSocialRoutes = new RedSocialRoutes();
exports.default = redSocialRoutes.router;
