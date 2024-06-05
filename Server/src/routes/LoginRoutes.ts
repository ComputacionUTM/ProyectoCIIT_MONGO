import { Router } from 'express';
import {loginController } from '../controllers/loginController';

class LoginRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/',loginController.crearUsuario);
        this.router.post('/login',loginController.login);
        this.router.get('/logout',loginController.logout);
        /*this.router.get('/obtenerUsuario/:id',empresaController.listOne);
        this.router.post('/', empresaController.createUsuario);
        this.router.delete('/:id',empresaController.borrarUsuario);
        this.router.put('/:id',empresaController.actualizarUsuario);*/
    }
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;