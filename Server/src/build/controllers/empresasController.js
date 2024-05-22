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
exports.empresaController = void 0;
const empresa_model_1 = __importDefault(require("../models/empresa.model"));
class EmpresaController {
    constructor() {
    }
    createEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_empresa, direccion, rfc, descripcion, description, telefono, fotito } = req.body;
                const nuevoEmpresa = new empresa_model_1.default({
                    nombre_empresa,
                    direccion,
                    rfc,
                    descripcion,
                    description,
                    telefono,
                    fotito
                });
                const empresaGuardado = yield nuevoEmpresa.save();
                res.json({
                    id: empresaGuardado._id,
                    nombre_empresa: empresaGuardado.nombre_empresa,
                    direccion: empresaGuardado.direccion,
                    rfc: empresaGuardado.rfc,
                    descripcion: empresaGuardado.descripcion,
                    description: empresaGuardado.description,
                    telefono: empresaGuardado.telefono,
                    fotito: empresaGuardado.fotito,
                    createAt: empresaGuardado.createdAt,
                    updateAt: empresaGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    mostrar_todos_empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield empresa_model_1.default.find();
                res.json(empresas);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    actualizarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield empresa_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.json(empresas);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    eliminarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield empresa_model_1.default.findByIdAndDelete(req.params.id);
                //console.log(empresas);
                if (empresas == null) {
                    //console.log("Probando...");
                    res.json({ mensaje: "No existe ese dato para eliminar" });
                }
                else {
                    res.json({ id: empresas.id, mensaje: "Empresa eliminada con exito" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield empresa_model_1.default.findById(req.params.id);
                res.json(empresas);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    actualizarFotito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield empresa_model_1.default.findByIdAndUpdate(req.params.id, { "fotito": "1" }, { new: true });
                res.json(empresas);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.empresaController = new EmpresaController();
