import { Router } from 'express';
import { rolesController } from '../controllers/rolesController';
import { validarToken } from '../middleware/auth';
class RolesRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/',rolesController.createRol);
        this.router.get('/obtenerRol/:id',rolesController.listOne);
        this.router.put('/:id',rolesController.actualizarRol);
        this.router.get('/',rolesController.mostrarRoles);
        this.router.delete('/eliminaRol/:id', rolesController.deleteRol);
    }
}
const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
