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
exports.noticiasController = void 0;
const noticias_model_1 = __importDefault(require("../models/noticias.model"));
class NoticiasController {
    constructor() {
    }
    createNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, title, autor, fecha_publicacion, contenido, content } = req.body;
            try {
                console.log("ENTRANDO...");
                const nuevaNoticia = new noticias_model_1.default({
                    titulo,
                    title,
                    autor,
                    fecha_publicacion,
                    contenido,
                    content
                });
                console.log(nuevaNoticia);
                const noticiaGuardada = yield nuevaNoticia.save();
                //const token = await createAccesToken({ id: usuarioGuardado._id });
                //res.cookie('token', token);
                res.json({
                    id: noticiaGuardada._id,
                    titulo: noticiaGuardada.titulo,
                    title: noticiaGuardada.title,
                    autor: noticiaGuardada.autor,
                    fecha_publicacion: noticiaGuardada.fecha_publicacion,
                    contenido: noticiaGuardada.contenido,
                    content: noticiaGuardada.content,
                    createAt: noticiaGuardada.createdAt,
                    updateAt: noticiaGuardada.updatedAt
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    mostrarNoticias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticias = yield noticias_model_1.default.find();
            if (noticias.length == 0)
                res.json(false);
            else
                res.json(noticias);
        });
    }
    mostrarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrar una noticia.");
            const { id } = req.params;
            const noticia = yield noticias_model_1.default.findById(id);
            res.json(noticia);
        });
    }
    eliminarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const noticia = yield noticias_model_1.default.findByIdAndDelete(id);
            res.json(noticia);
        });
    }
    actualizarNoticias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Actualizando noticia");
            try {
                const noticia = yield noticias_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.json(noticia);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.noticiasController = new NoticiasController();
