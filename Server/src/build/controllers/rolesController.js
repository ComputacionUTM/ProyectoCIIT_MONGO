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
exports.rolesController = void 0;
const database_1 = require("../database"); //acceso a la base de datos
const roles_model_1 = __importDefault(require("../models/roles.model"));
class RolesController {
    constructor() {
        (0, database_1.connectDB)();
    }
    createRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_rol, name_rol } = req.body;
            try {
                const nuevoRol = new roles_model_1.default({
                    nombre_rol,
                    name_rol
                });
                console.log(nuevoRol);
                const rolGuardado = yield nuevoRol.save();
                res.json({
                    id: rolGuardado._id,
                    nombre_empresa: rolGuardado.nombre_rol,
                    name_rol: rolGuardado.name_rol,
                    createAt: rolGuardado.createdAt,
                    updateAt: rolGuardado.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando un rol");
            const role = yield roles_model_1.default.findById(req.params.id);
            res.json(role);
        });
    }
    actualizarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando un rol");
            const rol = yield roles_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(rol);
        });
    }
    mostrarRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrando Roles");
            const rol = yield roles_model_1.default.find();
            res.json(rol);
        });
    }
    deleteRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Eliminando un rol");
            try {
                const role = yield roles_model_1.default.findByIdAndDelete(req.params.id);
                if (!role) {
                    res.status(404).json({ message: 'Rol no encontrado' });
                }
                else {
                    res.json({ message: 'Rol eliminado exitosamente' });
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.rolesController = new RolesController();
