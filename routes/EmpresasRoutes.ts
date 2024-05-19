import { Router } from 'express';
import { empresaController } from '../controllers/empresasController';

class EmpresasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/',empresaController.createEmpresa);
        /*this.router.get('/obtenerUsuario/:id',empresaController.listOne);
        this.router.post('/', empresaController.createUsuario);
        this.router.delete('/:id',empresaController.borrarUsuario);
        this.router.put('/:id',empresaController.actualizarUsuario);*/
    }
}
const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;