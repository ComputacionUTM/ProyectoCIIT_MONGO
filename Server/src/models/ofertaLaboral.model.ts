import mongoose, { Schema, Model } from 'mongoose';

interface OfertaLaboral {
    salario: number;
    puesto: string;
    position: string;
    descripcion: string;
    description: string;
    horario: string;
    id_empresa : String;//no deberia ser un string -- referencia a otra tabla, no va aqui, va abajo
    createdAt: Date;
    updatedAt: Date;
}

const schemaOfertaLaboral = new Schema<OfertaLaboral>({
    salario: {
        type: Number,
        required: true,
        trim: true
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
        trim: true
    },
}, {
    timestamps: true
});

export default mongoose.model('OfertaLaboral', schemaOfertaLaboral, 'ofertalaboral');
