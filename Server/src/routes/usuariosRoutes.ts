import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';
import { validarToken } from '../middleware/auth';
class UsuariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/',usuariosController.mostrar_todos_usuarios);
        this.router.get('/obtenerUsuario/:id',usuariosController.listOne);
        this.router.post('/crearUsuario/', usuariosController.createUsuario);
        this.router.delete('/eliminarUsuario/:id',usuariosController.eliminarUsuario);
        this.router.get('/obtenerUsuarioCorreo/:correo', usuariosController.obtenerUsuarioCorreo);
        this.router.put('/actualizarUsuario/:id',usuariosController.actualizarUsuario);
        this.router.put('/reestablecerContrasena/:token', usuariosController.actualizarContrasena);
        this.router.put('/actualizarFotito/:id',usuariosController.actualizarFotito);
        this.router.get('/listarUsuariosRol/:id',usuariosController.listarUsuariosRol);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;