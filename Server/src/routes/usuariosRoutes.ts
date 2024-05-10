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

        this.router.post('/', usuariosController.createUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;