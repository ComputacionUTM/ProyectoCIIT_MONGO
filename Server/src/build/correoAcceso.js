"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
class CorreoController {
}
exports.usuariosController = new CorreoController();
/////////////////////////////////////////
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var email = require("emailjs/email");
function enviarCorreo(body) {
    var server = email.server.connect({
        user: "webproyecto03@gmail.com",
        password: "kgvwjiujyocuuitr",
        host: "smtp.gmail.com",
        tls: {
            rejectUnauthorized: false
        }
    });
    //Tokenizamos el correo para poder ponerlo en la liga
    var correo = body.Email;
    const token = jsonwebtoken_1.default.sign(correo, process.env.TOKEN_SECRET || 'prueba');
    console.log(token);
    var message = {
        from: "webproyecto03@gmail.com",
        to: "<" + body.Email + ">",
        bbc: "",
        subject: "Testing!",
        attachment: [
            { data: `<a href="http://localhost:4200/reestablecerContrasena/${token}">Click Aquí<a/>`, alternative: true }
        ]
    };
    server.send(message, function (err, message) {
        if (err) {
            console.error("Error sending email:", err);
        }
        else {
            console.log("Email sent successfully!");
        }
    });
}
module.exports = enviarCorreo;
