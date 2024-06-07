import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Login from '../models/login.model'
import { createAccesToken } from '../libs/jwt'


class LoginController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    /*
    nombre_empresa: string;
    direccion: string;
    rfc: string;
    descripcion: string;
    description: string;
    */
    public async crearUsuario(req: Request, res: Response): Promise<void> {
        const { correo, password } = req.body;
        try {
            console.log("ENTRANDO...");
            const hashPassword = await bcrypt.hash(password, 10)
            const nuevoLogin = new Login(
                {
                    correo,
                    password: hashPassword
                })
            console.log(nuevoLogin);

            const usuarioGuardado = await nuevoLogin.save();
            const token = await createAccesToken({ id: usuarioGuardado._id });
            console.log(token);
            res.cookie('token', token);
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json({ mensaje: "hi" })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { correo, password } = req.body
        const usuarioEncontrado = await Login.findOne({ correo });

        if (!usuarioEncontrado) //null es equivalente a 0
            res.status(400).json({ mensaje: "Usuario no encontrado" });
        else {
            const esCorrecto = await bcrypt.compare(password, usuarioEncontrado.password)
            if (!esCorrecto)
                res.status(400).json({ mensaje: "Credenciales inválidas" });

            const token = await createAccesToken({ id: usuarioEncontrado._id });
            res.cookie('token', token);

            res.json(
                {
                    id: usuarioEncontrado._id,
                    correo: usuarioEncontrado.correo,
                    createAt: usuarioEncontrado.createdAt,
                    updateAt: usuarioEncontrado.updatedAt
                })

            //res.json(token)
        }



    }

    public async logout(req: Request, res: Response): Promise<void> {
        console.log("deslogueando");
        res.cookie('token', "", { expires: new Date(0) }) //expira hoy
        res.sendStatus(200)
    }
    public async perfil(req: any, res: Response): Promise<void> {
        console.log(req.usuario)
        
        const loginEncontrado = await Login.findById(req.usuario.id)

        
        if (!loginEncontrado)
            res.status(400).json({ mensaje: "Usuario no encontrado" })
        res.json({
            id: loginEncontrado?._id,
            correo: loginEncontrado?.correo,
            createdAt: loginEncontrado?.createdAt,
            updatedAt: loginEncontrado?.updatedAt
        })
    }
    //http://localhost:3000/api/login/perfil



    /*public async mostrar_todos_usuarios(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todos usuario");
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log("Mostrando un usuario");
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }

    public async borrarUsuario(req: Request, res: Response): Promise<void> {
        console.log("Borrando un usuario");
        const usuario = await Usuario.findByIdAndDelete(req.params.id)
        res.json(usuario)
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        console.log("Actualizando un usuario");
        const usuario = await Usuario.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(usuario)
    }*/


}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}

export const loginController = new LoginController();