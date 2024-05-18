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
        this.router.put('/:id',usuariosController.actualizarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;