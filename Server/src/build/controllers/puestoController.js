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
exports.puestoController = void 0;
const puesto_model_1 = __importDefault(require("../models/puesto.model"));
class PuestoController {
    constructor() {
    }
    createPuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, sueldo } = req.body;
            try {
                const nuevoPuesto = new puesto_model_1.default({
                    nombre,
                    descripcion,
                    sueldo
                });
                console.log(nuevoPuesto);
                const puestoGuardado = yield nuevoPuesto.save();
                res.json({
                    id: puestoGuardado._id,
                    nombre: puestoGuardado.nombre,
                    descripcion: puestoGuardado.descripcion,
                    sueldo: puestoGuardado.sueldo,
                    createAt: puestoGuardado.createdAt,
                    updateAt: puestoGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando Puestos");
            const rol = yield puesto_model_1.default.find();
            res.json(rol);
        });
    }
    listRestricciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando Puestos");
            const { text1, text2, sueldo } = req.body;
            const rol = yield puesto_model_1.default.find({ $and: [{ sueldo: { $gte: sueldo } }, { $or: [{ nombre: { $regex: text1 } }, { nombre: { $regex: text2 } }] }] });
            //const rol = await puesto.find({nombre:/Desa/})//Bueca una subcadena en el atributo "nombre"
            /*Operadores relacionales
            $ne (no iguales)
            $gt (mayores que)
            $gte (mayores o iguales)
            $lt (menor que)
            $lte (menor o igual)
            $in [15000,20000] (Rango)
            $nin [15000,20000] (fuera de rango)
            Operadores logicos
            $and:[{nombre:"Desarrollador web"},{"sueldo":20000}]
            $or:[{nombre:"Desarrollador web"},{"nombre":"Full stack"}]
            */
            res.json(rol);
        });
    }
    listRango(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando Puestos Por Rango");
            const { text, limInferior, limSuperior } = req.body;
            const rol = yield puesto_model_1.default.find({
                nombre: { $regex: text },
                sueldo: { $gte: limInferior, $lte: limSuperior }
            });
            res.json(rol);
        });
    }
}
exports.puestoController = new PuestoController();
