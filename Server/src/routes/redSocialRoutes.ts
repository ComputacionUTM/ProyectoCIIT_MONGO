import { Router } from 'express';
import { redSocialController } from '../controllers/redSocialController';
import { validarToken } from '../middleware/auth';
class RedSocialRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.delete('/eliminarRed/:id', redSocialController.eliminarRed);
        
    }
}
const redSocialRoutes = new RedSocialRoutes();
export default redSocialRoutes.router;