import { Router } from 'express';
import { validarToken } from '../middleware/auth';
import { noticiasController } from '../controllers/noticiasController';

class NoticiasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', noticiasController.createNoticia);
        this.router.get('/verNoticias', noticiasController.mostrarNoticias);
        this.router.get('/verNoticia/:id', noticiasController.mostrarNoticia);
        this.router.delete('/:id', noticiasController.eliminarNoticia);
        this.router.put('/actualizarNoticia/:id', noticiasController.actualizarNoticias);
    }
}
const noticiasRoutes = new NoticiasRoutes();
export default noticiasRoutes.router;