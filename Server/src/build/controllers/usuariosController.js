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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../database"); //acceso a la base de datos
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class UsuariosController {
    constructor() {
        (0, database_1.connectDB)();
    }
    //aqui va el crud
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, correo, password, fotito, id_rol } = req.body;
            try {
                console.log("ENTRANDO...");
                const nuevoUsuario = new usuario_model_1.default({
                    usuario,
                    correo,
                    password,
                    fotito,
                    id_rol
                });
                console.log(nuevoUsuario);
                const usuarioGuardado = yield nuevoUsuario.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: usuarioGuardado._id,
                    usuario: usuarioGuardado.usuario,
                    correo: usuarioGuardado.correo,
                    fotito: usuarioGuardado.fotito,
                    id_rol: usuarioGuardado.id_rol,
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    obtenerUsuarioCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo } = req.params;
                const user = yield usuario_model_1.default.findOne({ correo: correo });
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ message: "Correo no encontrado" });
                }
            }
            catch (error) {
                console.error("Error al obtener el usuario por correo:", error);
                res.status(500).json({ error: 'Error al obtener el usuario' });
            }
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
    mostrar_todos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando todos usuario");
            const usuarios = yield usuario_model_1.default.find();
            res.json(usuarios);
        });
    }
    listarUsuariosRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando usuarios por ROl");
            const usuario = yield usuario_model_1.default.find({ "id_rol": req.params.id });
            res.json(usuario);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando un usuario");
            const usuario = yield usuario_model_1.default.findById(req.params.id);
            res.json(usuario);
        });
    }
    actualizarContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando contraseña");
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            const update = { password: req.body.password };
            const usuario = yield usuario_model_1.default.findByIdAndUpdate(req.params.token, update, { new: true });
            res.json(usuario);
        });
    }
    actualizarFotito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando un usuario");
            req.body.fotito = 1;
            const update = { fotito: req.body.fotito };
            const options = { new: true };
            const usuario = yield usuario_model_1.default.findByIdAndUpdate(req.params.id, update, { new: true });
            res.json(usuario);
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
/*function decodeJWT(token: any) {
   return (Buffer.from(token.split('.')[1], 'base64').toString());
}*/
exports.usuariosController = new UsuariosController();
