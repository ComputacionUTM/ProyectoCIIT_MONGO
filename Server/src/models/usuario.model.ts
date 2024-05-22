import mongoose, { Schema, Model } from 'mongoose';

interface Usuario {
    nombre: string;
    correo: string;
    contrasena: string;
    fotito: number;
    id_Rol : string;//no deberia ser un string -- referencia a otra tabla, no va aqui, va abajo
    createdAt: Date;
    updatedAt: Date;
}
const schemaUsuario = new Schema<Usuario>({
    nombre:
    {
        type: String,
        required: true,
        trim: true
    },
    correo:
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasena:
    {
        type: String,
        required: true
    },
    fotito:
    {
        type: Number,
        required: true
    },
    id_Rol:
    {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('Usuario', schemaUsuario);