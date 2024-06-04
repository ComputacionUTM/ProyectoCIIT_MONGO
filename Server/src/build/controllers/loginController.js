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
exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../database"); //acceso a la base de datos
const login_model_1 = __importDefault(require("../models/login.model"));
const jwt_1 = require("../libs/jwt");
class LoginController {
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
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            try {
                console.log("ENTRANDO...");
                const hashPassword = yield bcryptjs_1.default.hash(password, 10);
                const nuevoLogin = new login_model_1.default({
                    correo,
                    password: hashPassword
                });
                console.log(nuevoLogin);
                const usuarioGuardado = yield nuevoLogin.save();
                const token = yield (0, jwt_1.createAccesToken)({ id: usuarioGuardado._id });
                console.log(token);
                res.cookie('token', token);
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({ mensaje: "hi" });
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
exports.loginController = new LoginController();
