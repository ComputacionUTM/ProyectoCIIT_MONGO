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

    }
}
const noticiasRoutes = new NoticiasRoutes();
export default noticiasRoutes.router;