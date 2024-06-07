import express, { Application } from 'express';
import usuariosRoutes from './routes/usuariosRoutes';
import empresasRoutes from './routes/EmpresasRoutes';
import ofertalaboralRoutes from './routes/ofertalaboralRoutes';
import rolesRoutes from './routes/rolesRoutes';
import redSocialRoutes from './routes/redSocialRoutes';
import noticiasRoutes from './routes/noticiasRoutes';
import { connectDB } from './database'; //acceso a la base de datos
import cookiePArser from 'cookie-parser'

import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import morgan from 'morgan';
import cors from 'cors';
import puestoRoutes from './routes/puestoRoutes';
import LoginRoutes  from './routes/LoginRoutes';
class Server {
    public app: Application;
    constructor() {
        connectDB();
        this.app = express();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000); //En que puerto va a ejecutar
        this.app.use(morgan('dev')); //que ejecutamos y que tiempo
        this.app.use(cors());
        this.app.use(express.json()); //permite que utilicemos json
        this.app.use(cookiePArser());
        this.app.use(express.urlencoded({ extended: false })); //decodifca las url
    }
    routes(): void {
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/empresas', empresasRoutes);  //Se puede validar todas las rutas sin tener que hacerlo una a una
        this.app.use('/api/ofertasLaborales', ofertalaboralRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/redSocial', redSocialRoutes);
        this.app.use('/api/noticias', noticiasRoutes);
        this.app.use('/api/puesto',puestoRoutes);
        this.app.use('/api/login', LoginRoutes);

    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se esta ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
