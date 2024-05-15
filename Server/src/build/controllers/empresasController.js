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
const database_1 = require("../database"); //acceso a la base de datos
const empresa_model_1 = __importDefault(require("../models/empresa.model"));
class EmpresaController {
    constructor() {
        (0, database_1.connectDB)();
    }
    //aqui va el crud
    /*
    nombre_empresa: string;
    direccion: string;
    rfc: string;
    descripcion: string;
    description: string;
    */
    createEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_empresa, direccion, rfc, descripcion, description } = req.body;
            try {
                console.log("ENTRANDO...");
                const nuevoEmpresa = new empresa_model_1.default({
                    nombre_empresa,
                    direccion,
                    rfc,
                    descripcion,
                    description
                });
                console.log(nuevoEmpresa);
                const empresaGuardado = yield nuevoEmpresa.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: empresaGuardado._id,
                    nombre_empresa: empresaGuardado.nombre_empresa,
                    direccion: empresaGuardado.direccion,
                    rfc: empresaGuardado.rfc,
                    descripcion: empresaGuardado.descripcion,
                    description: empresaGuardado.description,
                    createAt: empresaGuardado.createdAt,
                    updateAt: empresaGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}
exports.empresaController = new EmpresaController();
