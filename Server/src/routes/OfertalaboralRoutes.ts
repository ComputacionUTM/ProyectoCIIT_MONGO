import { Router } from 'express';
import { ofertaLaboralController } from '../controllers/ofertalaboralController';

class OfertaLaboralRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/obtenerOfertasLaborales',ofertaLaboralController.getOfertasLaborales);
        this.router.get('/obtenerOfertaLaboral/:id',ofertaLaboralController.getOfertaLaboral);
        this.router.post('/crearOfertaLaboral',ofertaLaboralController.createOfertaLaboral);
        /*
        this.router.post('/', ofertaLaboralController.createOfertaLaboral);
        this.router.delete('/:id',ofertaLaboralController.borrarOfertaLaboral);
        this.router.put('/:id',ofertaLaboralController.actualizarOfertaLaboral);*/
    }
}
const ofertaLaboralRoutes = new OfertaLaboralRoutes();
export default ofertaLaboralRoutes.router;