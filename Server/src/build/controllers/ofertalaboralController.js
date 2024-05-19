"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofertaLaboralController = void 0;
const database_1 = require("../database"); //acceso a la base de datos
const ofertaLaboral_model_1 = __importDefault(require("../models/ofertaLaboral.model"));
class OfertaLaboralController {
    constructor() {
        (0, database_1.connectDB)();
    }
    //aqui va el crud
    createOfertaLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ENTRANDO...");
                const nuevaOfertaLaboral = new ofertaLaboral_model_1.default({
                    salario: req.body.salario,
                    puesto: req.body.puesto,
                    position: req.body.position,
                    descripcion: req.body.descripcion,
                    description: req.body.description,
                    horario: req.body.horario,
                    id_empresa: req.body.id_empresa
                });
                console.log(nuevaOfertaLaboral);
                const ofertaLaboralGuardado = yield nuevaOfertaLaboral.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: ofertaLaboralGuardado._id,
                    salario: ofertaLaboralGuardado.salario,
                    puesto: ofertaLaboralGuardado.puesto,
                    position: ofertaLaboralGuardado.position,
                    descripcion: ofertaLaboralGuardado.descripcion,
                    description: ofertaLaboralGuardado.description,
                    horario: ofertaLaboralGuardado.horario,
                    createAt: ofertaLaboralGuardado.createdAt,
                    updateAt: ofertaLaboralGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getOfertasLaborales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando todas las ofertas laborales");
            const ofertas = yield ofertaLaboral_model_1.default.find();
            res.json(ofertas);
        });
    }
    getOfertaLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando una oferta laboral");
            const oferta = yield ofertaLaboral_model_1.default.findById(req.params.id);
            res.json(oferta);
        });
    }
    putOfertaLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando una oferta laboral");
            const oferta = yield ofertaLaboral_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(oferta);
        });
    }
    deleteOfertaLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ofertaEliminada = yield ofertaLaboral_model_1.default.findByIdAndDelete(req.params.id);
                if (!ofertaEliminada) {
                    res.status(404).json({ message: "Oferta laboral no encontrada" });
                }
                else {
                    res.json({ message: "Oferta laboral eliminada correctamente", oferta: ofertaEliminada });
                }
            }
            catch (error) {
                console.error("Error al eliminar la oferta laboral:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
}
exports.ofertaLaboralController = new OfertaLaboralController();
