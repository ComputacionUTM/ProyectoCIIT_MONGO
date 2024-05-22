import { Router } from 'express';

import { validarToken } from '../middleware/auth';
import { puestoController } from '../controllers/puestoController';
class RolesRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/',puestoController.createPuesto);
        this.router.get('/',puestoController.list);
        this.router.get('/:salario',puestoController.listRestriccion);
        this.router.post('/:salario',puestoController.listRestriccion);
    }
}
const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
