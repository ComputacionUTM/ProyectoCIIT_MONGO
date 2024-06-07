import { Router } from 'express';
import { empresaController } from '../controllers/empresasController';
import { validarToken } from '../middleware/auth';

class EmpresasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/crearEmpresa/', empresaController.createEmpresa);
        this.router.get('/MostrarTodasEmpresas/', validarToken, empresaController.mostrar_todos_empresa);
        this.router.put('/actualizarEmpresa/:id', empresaController.actualizarEmpresa);
        this.router.delete('/eliminarEmpresa/:id', empresaController.eliminarEmpresa);
        this.router.get('/ListOneEmpresa/:id', empresaController.listOne);
        this.router.get('/ListOneEmpresaRestricciones/', empresaController.listOneRestricciones);
        this.router.get('/ListConMerge/', empresaController.listConMerge);        
        this.router.get('/ListMergeProjection/', empresaController.ListMergeProjection);
        this.router.put('/actualizarFotito/:id', empresaController.actualizarFotito);
    }
} //http://localhost:3000/api/empresas/MostrarTodasEmpresas/
const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;
