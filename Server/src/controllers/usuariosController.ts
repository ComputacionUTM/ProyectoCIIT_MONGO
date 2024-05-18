import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Usuario from '../models/usuario.model'


class UsuariosController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    public async createUsuario(req: Request, res: Response): Promise<void> { //Leonardo
        const { usuario, correo, password,fotito,id_rol } = req.body;
        try {
            console.log("ENTRANDO...");

            const nuevoUsuario = new Usuario(
                {
                    usuario,
                    correo,
                    password,
                    fotito,
                    id_rol
                })
            console.log(nuevoUsuario);

            const usuarioGuardado = await nuevoUsuario.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: usuarioGuardado._id,
                    usuario: usuarioGuardado.usuario,
                    correo: usuarioGuardado.correo,
                    fotito: usuarioGuardado.fotito,
                    id_rol: usuarioGuardado.id_rol,
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async obtenerUsuarioCorreo(req: Request, res: Response): Promise<void> {//Leonardo
        try {
          const { correo } = req.params;
          const user = await Usuario.findOne({ correo: correo });
      
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({ message: "Correo no encontrado" });
          }
        } catch (error) {
          console.error("Error al obtener el usuario por correo:", error);
          res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {//Leonardo
        console.log("Borrando un usuario");
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id)
            if (!usuario) {
                res.status(404).json({ message: "Usuario no encontrado" });
            } else {
                res.json(usuario)
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async mostrar_todos_usuarios(req: Request, res: Response): Promise<void> { //Juan
        console.log("Mostrando todos usuario");
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }

    public async listarUsuariosRol(req: Request, res: Response): Promise<void> {//Juan
        console.log("Mostrando usuarios por ROl");
    
        const usuario = await Usuario.find({"id_rol": req.params.id})
        res.json(usuario)
    }

    public async listOne(req: Request, res: Response): Promise<void> { // Alberto
        console.log("Mostrando un usuario");
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }

    public async actualizarContrasena(req: Request, res: Response): Promise<void> { //Alberto
        console.log("Actualizando contraseña");
    
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const update = { password: req.body.password };
        const usuario = await Usuario.findByIdAndUpdate(req.params.token,update,{new:true})
        res.json(usuario)
    }

    public async actualizarFotito(req: Request, res: Response): Promise<void> {//Eduardo
        console.log("Actualizando un usuario");
        req.body.fotito = 1;
        const update = { fotito: req.body.fotito };
        const options = { new: true };
        const usuario = await Usuario.findByIdAndUpdate(req.params.id,update,{new:true})
        res.json(usuario)
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> { //Angel
        console.log("Actualizando un usuario");
        const usuario = await Usuario.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(usuario)
    }
}
/*function decodeJWT(token: any) {
   return (Buffer.from(token.split('.')[1], 'base64').toString());
}*/

export const usuariosController = new UsuariosController();