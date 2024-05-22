import { Request, Response } from 'express';
import ofertaLaboralModel from '../models/ofertaLaboral.model';


class OfertaLaboralController {

    constructor() {
    }
    //aqui va el crud
    public async createOfertaLaboral(req: Request, res: Response): Promise<void> {
        try {
            console.log("ENTRANDO...");

            const nuevaOfertaLaboral = new ofertaLaboralModel(
                {
                    salario: req.body.salario,
                    puesto: req.body.puesto,
                    position: req.body.position,
                    descripcion: req.body.descripcion,
                    description: req.body.description,
                    horario: req.body.horario,
                    id_empresa: req.body.id_empresa

                })
            console.log(nuevaOfertaLaboral);

            const ofertaLaboralGuardado = await nuevaOfertaLaboral.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: ofertaLaboralGuardado._id,
                    salario: ofertaLaboralGuardado.salario,
                    puesto: ofertaLaboralGuardado.puesto,
                    position: ofertaLaboralGuardado.position,
                    descripcion: ofertaLaboralGuardado.descripcion,
                    description: ofertaLaboralGuardado.description,
                    horario: ofertaLaboralGuardado.horario,
                    createAt: ofertaLaboralGuardado.createdAt,
                    updateAt: ofertaLaboralGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getOfertasLaborales(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todas las ofertas laborales");
        const ofertas = await ofertaLaboralModel.find()
        res.json(ofertas)
    }

    public async getOfertaLaboral(req: Request, res: Response): Promise<void> {
        console.log("Mostrando una oferta laboral");
        const oferta = await ofertaLaboralModel.findById(req.params.id)
        res.json(oferta)
    }

    public async putOfertaLaboral(req: Request, res: Response): Promise<void> {
        console.log("Actualizando una oferta laboral");
        const oferta = await ofertaLaboralModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(oferta)
    }

    public async deleteOfertaLaboral(req: Request, res: Response): Promise<void> {
        try {
            const ofertaEliminada = await ofertaLaboralModel.findByIdAndDelete(req.params.id);
            if (!ofertaEliminada) {
                res.status(404).json({ message: "Oferta laboral no encontrada" });
            } else {
                res.json({ message: "Oferta laboral eliminada correctamente", oferta: ofertaEliminada });
            }
        } catch (error) {
            console.error("Error al eliminar la oferta laboral:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    
}

export const ofertaLaboralController = new OfertaLaboralController();
