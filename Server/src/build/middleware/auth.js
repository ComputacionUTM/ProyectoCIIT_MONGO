"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const validarToken = (req, res, next) => {
    dotenv_1.default.config();
    const palabraSecreta = process.env.TOKEN_SECRET;
    console.log(req.cookies);
    const { token } = req.cookies;
    console.log("token: ", token);
    if (!token) {
        return res.status(401).json({ mensaje: "No token, autorización denegada" });
    }
    else {
        jsonwebtoken_1.default.verify(token, palabraSecreta, (err, user) => {
            if (err)
                return res.status(403).json({ mensaje: "token inválido" });
            console.log("usuario", user);
            req.usuario = user;
        });
        next();
    }
};
exports.validarToken = validarToken;
