import mongoose, { Schema, Model } from 'mongoose';

interface Usuario {
    usuario: string;
    correo: string;
    password: string;
    fotito: number;
    id_rol : string;
    createdAt: Date;
    updatedAt: Date;
}
const schemaUsuario = new Schema<Usuario>({
    usuario:
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
    password:
    {
        type: String,
        required: true
    },
    fotito:
    {
        type: Number,
        required: true
    },
    id_rol:
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