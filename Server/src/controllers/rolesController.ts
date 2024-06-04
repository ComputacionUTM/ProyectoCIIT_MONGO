import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import roles from '../models/roles.model'


class RolesController {

    constructor() {
    }
    public async createRol(req: Request, res: Response): Promise<void> {
        const { nombre_rol,name_rol} = req.body;
        try {
            const nuevoRol = new roles(
                {
                    nombre_rol,
                    name_rol
                })
            console.log(nuevoRol);
            const rolGuardado = await nuevoRol.save();
            res.json(
                {
                    id: rolGuardado._id,
                    nombre_empresa: rolGuardado.nombre_rol,
                    name_rol: rolGuardado.name_rol,
                    createAt: rolGuardado.createdAt,
                    updateAt: rolGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log("Mostrando un rol");
        const role = await roles.findById(req.params.id)
        res.json(role)
    }
    public async actualizarRol(req: Request, res: Response): Promise<void> {
        console.log("Actualizando un rol");
        const rol = await roles.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(rol)
    }
    public async mostrarRoles(req: Request, res: Response): Promise<void>{
        console.log("Mostrando Roles");
        const rol = await roles.find()
        res.json(rol)
    }

    public async deleteRol(req: Request, res: Response): Promise<void> {
        console.log("Eliminando un rol");
        try {
            const role = await roles.findByIdAndDelete(req.params.id);
            if (!role) {
                res.status(404).json({ message: 'Rol no encontrado' });
            } else {
                res.json({ message: 'Rol eliminado exitosamente' });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
}
export const rolesController = new RolesController();
