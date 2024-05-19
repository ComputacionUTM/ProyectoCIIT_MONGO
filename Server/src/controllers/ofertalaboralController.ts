import { Request, Response } from 'express';
import { connectDB } from '../database'; //acceso a la base de datos
import ofertaLaboralModel from '../models/ofertaLaboral.model';


class OfertaLaboralController {

    constructor() {
        connectDB();
    }
    //aqui va el crud

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

    async createOfertaLaboral(req: Request, res: Response): Promise<void> {
        const { salario, puesto, position, id_empresa, descripcion, description, horario } = req.body;
        
        try {
            console.log("Creando nueva oferta laboral...");
    
    
            const nuevaOfertaLaboral = new ofertaLaboralModel({
                salario,
                puesto,
                position,
                id_empresa,
                descripcion,
                description,
                horario
            });
    
            console.log(nuevaOfertaLaboral);
    
            const ofertaLaboralGuardada = await nuevaOfertaLaboral.save();
    
            res.json({
                idOferta: ofertaLaboralGuardada._id,
                salario: ofertaLaboralGuardada.salario,
                puesto: ofertaLaboralGuardada.puesto,
                position: ofertaLaboralGuardada.position,
                id_empresa: ofertaLaboralGuardada.id_empresa,
                descripcion: ofertaLaboralGuardada.descripcion,
                description: ofertaLaboralGuardada.description,
                horario: ofertaLaboralGuardada.horario,
                createAt: ofertaLaboralGuardada.createdAt,
                updateAt: ofertaLaboralGuardada.updatedAt
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
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
