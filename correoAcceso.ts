import {Request,Response} from 'express';
class CorreoController
{

}

export const usuariosController = new CorreoController();




/////////////////////////////////////////
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

var email = require("emailjs/email");

function enviarCorreo(body: any) { 
    var server = email.server.connect( {
        user: "webproyecto03@gmail.com",
        password: "kgvwjiujyocuuitr",
        host: "smtp.gmail.com",
        tls: {
            rejectUnauthorized: false
        }
    });

    //Tokenizamos el correo para poder ponerlo en la liga
    var correo = body.Email;
    const token : string = jwt.sign(correo, process.env.TOKEN_SECRET || 'prueba');
    console.log(token);


    var message = {
        from: "webproyecto03@gmail.com",
        to: "<" + body.Email + ">",
        bbc: "",
        subject: "Testing!",
        attachment: [
            {data: `<a href="http://localhost:4200/reestablecerContrasena/${token}">Click Aquí<a/>`, alternative: true }
        ]
    };

    server.send(message, function(err: any, message: any) {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent successfully!");
        }
    });
}


module.exports = enviarCorreo;