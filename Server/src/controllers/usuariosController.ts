import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario.model'


class UsuariosController {

    constructor() {
      
    }
    //aqui va el crud
    public async createUsuario(req: Request, res: Response): Promise<void> { //Leonardo
        let { nombre, correo, contrasena,fotito,id_Rol } = req.body;
        //const salt = await bcrypt.genSalt(10);
        //contrasena = await bcrypt.hash(req.body.contrasena, salt);
        try {
            console.log("ENTRANDO...");

            const nuevoUsuario = new Usuario(
                {
                    nombre,
                    correo,
                    contrasena,
                    fotito,
                    id_Rol
                })
            console.log(nuevoUsuario);

            const usuarioGuardado = await nuevoUsuario.save();

            res.json(
                {
                    id: usuarioGuardado._id,
                    nombre: usuarioGuardado.nombre,
                    contrasena: usuarioGuardado.contrasena,
                    correo: usuarioGuardado.correo,
                    fotito: usuarioGuardado.fotito,
                    id_Rol: usuarioGuardado.id_Rol,
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
    
        const usuario = await Usuario.find({"id_Rol": req.params.id})
        res.json(usuario)
    }

    public async listOne(req: Request, res: Response): Promise<void> { // Alberto
        console.log("Mostrando un usuario");
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }

    public async actualizarContrasena(req: Request, res: Response): Promise<void> { //Alberto
        console.log("Actualizando contraseña");
    
        //const salt = await bcrypt.genSalt(10);
        //req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt)
        const update = { contrasena: req.body.contrasena };
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

    public async ValidarUsuario(req: Request, res: Response): Promise<void> {
        const parametros = req.body;
        //const consulta = "SELECT * FROM usuarios WHERE correo = ?";
        //console.log(parametros);
        //console.log(consulta);
        try {
            const respuesta = await Usuario.find({"correo":parametros.correo});
            console.log(respuesta)
            //console.log(respuesta.length)
            if (respuesta.length > 0) {
                const usuario = respuesta[0];
                console.log(usuario);
                console.log(parametros);
                //bcrypt.compare(parametros.contrasena, usuario.contrasena, (err, resEncriptar) => {
                    //if (resEncriptar) {
                    if(parametros.contrasena == usuario.contrasena){
                        const prueba = {
                            id_: usuario.id,
                            nombre: usuario.nombre,
                            correo: usuario.correo,
                            id_Rol: usuario.id_Rol
                        };
                        res.json(prueba);
                    } else {
                        console.log("Contraseña incorrecta");
                        res.json({ id_Rol: "-1" });
                    }
                //});
                //console.log("funciona");
                //res.json(null)
            } else {
                console.log("Usuario no encontrado");
                res.json({ id_Rol: "-1" });
            }
        } catch (error) {
            console.error("Error al validar usuario:", error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    }  
}
/*function decodeJWT(token: any) {
   return (Buffer.from(token.split('.')[1], 'base64').toString());
}*/

export const usuariosController = new UsuariosController();