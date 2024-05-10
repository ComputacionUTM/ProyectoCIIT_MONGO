import express, { Application, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dontev from 'dotenv';
import fs from 'fs';

class Server {
    public app: Application;

    constructor() {
        dontev.config();
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname+"/imagenes"));
    }

    config(): void {
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.set('port', process.env.PORT || 3002);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.post('/uploadImagen', (req, res) => {
            //console.log(req.body);
            
            //console.log("upload imageeee", req.body.id);
            const file = req.body.src;
            const name = req.body.tipo;
            const id = req.body.id;
            const binaryData =
                Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""),
                    'base64').toString('binary');
            fs.writeFile(`${__dirname}/imagenes/` + name + '/' + id + '.jpg', binaryData,
                "binary", (err) => {
                    //console.log(err);
                });
            //console.log(res);
            res.json({ fileName: id + '.jpg' });
        });
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();