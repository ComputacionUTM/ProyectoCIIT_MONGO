"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertaLaboralController_1 = require("../controllers/ofertaLaboralController");
class OfertaLaboralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosOfertasLaborales/', (req, res) => res.send('probando ofertas'));
        this.router.get('/obtenerOferta/:id', ofertaLaboralController_1.ofertaLaboralController.listOne);
        this.router.post('/createOferta/', ofertaLaboralController_1.ofertaLaboralController.createOferta);
    }
}
const ofertaLaboralRoutes = new OfertaLaboralRoutes();
exports.default = ofertaLaboralRoutes.router;
