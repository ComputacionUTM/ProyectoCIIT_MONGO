import { Router } from 'express';
import { empresaController } from '../controllers/empresasController';

class EmpresasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/crearEmpresa/', empresaController.createEmpresa);
        this.router.get('/MostrarTodasEmpresas/', empresaController.mostrar_todos_empresa);
        this.router.put('/actualizarEmpresa/:id', empresaController.actualizarEmpresa);
        this.router.delete('/eliminarEmpresa/:id', empresaController.eliminarEmpresa);
        this.router.get('/ListOneEmpresa/:id', empresaController.listOne);
        this.router.put('/actualizarFotito/:id', empresaController.actualizarFotito);
    }
}
const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;
