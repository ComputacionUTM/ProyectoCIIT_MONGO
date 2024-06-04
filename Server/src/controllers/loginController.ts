import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Login from '../models/login.model'
import  {createAccesToken}  from  '../libs/jwt' 


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
        const {correo, password } = req.body;
        try {
            console.log("ENTRANDO...");
            const  hashPassword=  await  bcrypt.hash(password,  10  )
            const nuevoLogin = new Login(
                {
                    correo,
                    password:hashPassword
                })
            console.log(nuevoLogin);

            const usuarioGuardado = await nuevoLogin.save();
            const  token=  await  createAccesToken({id:usuarioGuardado._id});
            console.log(token);
            res.cookie(  'token'  ,token);
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json({mensaje:"hi"})
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

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