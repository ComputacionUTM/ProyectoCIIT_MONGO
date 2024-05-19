"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertalaboralController_1 = require("../controllers/ofertalaboralController");
class OfertaLaboralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearOfertaLaboral', ofertalaboralController_1.ofertaLaboralController.createOfertaLaboral);
        this.router.get('/obtenerOfertasLaborales', ofertalaboralController_1.ofertaLaboralController.getOfertasLaborales);
        this.router.get('/obtenerOfertaLaboral/:id', ofertalaboralController_1.ofertaLaboralController.getOfertaLaboral);
        this.router.put('/actualizarOfertaLaboral/:id', ofertalaboralController_1.ofertaLaboralController.putOfertaLaboral);
        /*
        this.router.post('/', ofertaLaboralController.createOfertaLaboral);
        */
        this.router.delete('/eliminarOfertaLaboral/:id', ofertalaboralController_1.ofertaLaboralController.deleteOfertaLaboral);
    }
}
const ofertaLaboralRoutes = new OfertaLaboralRoutes();
exports.default = ofertaLaboralRoutes.router;
