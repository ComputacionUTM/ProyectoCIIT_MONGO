import { Router } from 'express';
import { ofertaLaboralController } from '../controllers/ofertalaboralController';

class OfertaLaboralRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/crearOfertaLaboral',ofertaLaboralController.createOfertaLaboral);
        this.router.get('/obtenerOfertasLaborales',ofertaLaboralController.getOfertasLaborales);
        this.router.get('/obtenerOfertaLaboral/:id',ofertaLaboralController.getOfertaLaboral);
        this.router.put('/actualizarOfertaLaboral/:id',ofertaLaboralController.putOfertaLaboral);
        /*
        this.router.post('/', ofertaLaboralController.createOfertaLaboral);
        */
        this.router.delete('/eliminarOfertaLaboral/:id',ofertaLaboralController.deleteOfertaLaboral);
        
    }
}
const ofertaLaboralRoutes = new OfertaLaboralRoutes();
export default ofertaLaboralRoutes.router;