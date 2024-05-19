import mongoose, { Schema, Model } from 'mongoose';

interface OfertaLaboral {
    salario: number;
    puesto: string;
    position: string;
    descripcion: string;
    description: string;
    horario: string;
    id_empresa : String;
    createdAt: Date;
    updatedAt: Date;
}

const schemaOfertaLaboral = new Schema<OfertaLaboral>({
    salario: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    puesto: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    id_empresa: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, {
    timestamps: true
});

export default mongoose.model('OfertaLaboral', schemaOfertaLaboral, 'ofertas_laborales');
