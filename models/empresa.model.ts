import mongoose, { Schema, Model } from 'mongoose';

interface Empresa {
    nombre_empresa: string;
    direccion: string;
    rfc: string;
    descripcion: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
const schemaEmpresa = new Schema<Empresa>({
    nombre_empresa:
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    direccion:
    {
        type: String,
        required: true,
        trim: true,
    },
    rfc:
    {
        type: String,
        required: true,
        unique:true
    },
    descripcion:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('Empresa', schemaEmpresa);