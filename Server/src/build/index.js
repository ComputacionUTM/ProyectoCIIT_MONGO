"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const EmpresasRoutes_1 = __importDefault(require("./routes/EmpresasRoutes"));
const ofertalaboralRoutes_1 = __importDefault(require("./routes/ofertalaboralRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const redSocialRoutes_1 = __importDefault(require("./routes/redSocialRoutes"));
const noticiasRoutes_1 = __importDefault(require("./routes/noticiasRoutes"));
const database_1 = require("./database"); //acceso a la base de datos
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const puestoRoutes_1 = __importDefault(require("./routes/puestoRoutes"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
class Server {
    constructor() {
        (0, database_1.connectDB)();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //En que puerto va a ejecutar
        this.app.use((0, morgan_1.default)('dev')); //que ejecutamos y que tiempo
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //permite que utilicemos json
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: false })); //decodifca las url
    }
    routes() {
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/empresas', EmpresasRoutes_1.default); //Se puede validar todas las rutas sin tener que hacerlo una a una
        this.app.use('/api/ofertasLaborales', ofertalaboralRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/redSocial', redSocialRoutes_1.default);
        this.app.use('/api/noticias', noticiasRoutes_1.default);
        this.app.use('/api/puesto', puestoRoutes_1.default);
        this.app.use('/api/login', LoginRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se esta ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
