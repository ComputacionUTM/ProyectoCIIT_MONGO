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
exports.redSocialController = void 0;
const database_1 = require("../database"); //acceso a la base de datos
const red_social_model_1 = __importDefault(require("../models/red_social.model"));
class RedSocialController {
    constructor() {
        (0, database_1.connectDB)();
    }
    //aqui va el crud
    eliminarRed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Borrando una Red");
            const redSocial = yield red_social_model_1.default.findByIdAndDelete(req.params.id);
            res.json(redSocial);
        });
    }
    //Mostar todas las redes
    mostrar_todas_redes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando todas las redes");
            const redSocial = yield red_social_model_1.default.find();
            res.json(redSocial);
        });
    }
    //Mostar una red
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando una red");
            const redSocial = yield red_social_model_1.default.findById(req.params.id);
            res.json(redSocial);
        });
    }
    createRedSocial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, enlace, foto } = req.body;
            try {
                console.log("ENTRANDO...");
                const nuevaRedSocial = new red_social_model_1.default({
                    nombre,
                    enlace,
                    foto
                });
                console.log(nuevaRedSocial);
                const redSocialGuardada = yield nuevaRedSocial.save();
                res.json({
                    nombre: redSocialGuardada.nombre,
                    enlace: redSocialGuardada.enlace,
                    foto: redSocialGuardada.foto,
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    actualizarRed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando una red");
            const redSocial = yield red_social_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(redSocial);
        });
    }
}
exports.redSocialController = new RedSocialController();
