import express, { Application } from 'express';
import swagger_ui_express from 'swagger-ui-express';
import usuariosRoutes from './routes/usuariosRoutes';
import morgan from 'morgan';
import cors from 'cors';
import { validarToken } from './middleware/auth'
//import swaggerDocument from './swagger.json';
class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        //this.app.use('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000); //En que puerto va a ejecutar
        this.app.use(morgan('dev')); //que ejecutamos y que tiempo
        this.app.use(cors());
        this.app.use(express.json()); //permite que utilicemos json
        this.app.use(express.urlencoded({ extended: false })); //decodifca las url
    }
    routes(): void {
        this.app.use('/api/usuarios', usuariosRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se esta ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
