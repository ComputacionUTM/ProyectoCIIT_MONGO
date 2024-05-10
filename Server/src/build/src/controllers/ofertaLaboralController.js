"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofertaLaboralController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class OfertaLaboralController {
    mostrar_todos_puestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ofertalaboral');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM ofertalaboral WHERE idOferta = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Oferta no encontrado' });
        });
    }
    //EMPIEZA CRUD
    createOferta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idEmpresa = req.body.id_empresa;
            var resp = yield database_1.default.query("INSERT INTO ofertalaboral set ?", [req.body]);
            const idOferta = resp.insertId;
            const consulta = { "idEmpresa": idEmpresa, "idOferta": idOferta };
            resp = yield database_1.default.query(`INSERT INTO oferta_empresa set ?`, [consulta]);
            res.json(resp);
        });
    }
}
exports.ofertaLaboralController = new OfertaLaboralController();
