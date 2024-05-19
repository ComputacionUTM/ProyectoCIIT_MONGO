import mongoose, { Schema, Model } from 'mongoose';

interface Noticias {
    titulo: string;
    title: string;
    autor: string;
    fecha_publicacion: Date;
    contenido: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
const schemaNoticias = new Schema<Noticias>({
    titulo:
    {
        type: String,
        required: true,
        trim: true
    },
    title:
    {
        type: String,
        required: true,
        trim: true
    },
    autor:
    {
        type: String,
        required: true,
        trim: true,
    },
    fecha_publicacion:
    {
        type: Date,
        required: true
    },
    contenido:
    {
        type: String,
        required: true,
    },
    content:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
)
export default mongoose.model('Noticias', schemaNoticias);