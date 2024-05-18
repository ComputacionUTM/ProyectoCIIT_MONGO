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
exports.usuariosController = void 0;
const database_1 = require("../database"); //acceso a la base de datos
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class UsuariosController {
    constructor() {
        (0, database_1.connectDB)();
    }
    //aqui va el crud
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, correo, password } = req.body;
            try {
                console.log("ENTRANDO...");
                const nuevoUsuario = new usuario_model_1.default({
                    usuario,
                    correo,
                    password
                });
                console.log(nuevoUsuario);
                const usuarioGuardado = yield nuevoUsuario.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: usuarioGuardado._id,
                    usuario: usuarioGuardado.usuario,
                    correo: usuarioGuardado.correo,
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    mostrar_todos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando todos usuario");
            const usuarios = yield usuario_model_1.default.find();
            res.json(usuarios);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando un usuario");
            const usuario = yield usuario_model_1.default.findById(req.params.id);
            res.json(usuario);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Borrando un usuario");
            try {
                const usuario = yield usuario_model_1.default.findByIdAndDelete(req.params.id);
                if (!usuario) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
                else {
                    res.json(usuario);
                }
            }
            catch (error) {
                console.error("Error al eliminar usuario:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando un usuario");
            const usuario = yield usuario_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(usuario);
        });
    }
}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}
exports.usuariosController = new UsuariosController();
