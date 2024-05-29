import mongoose, { Schema, } from 'mongoose';
var empresaSchema = new Schema(
    {
        nombre:
        {
            type: String,
            required: true,
            trim: true
        },
        direccion:
        {
            type: String,
            required: true,
            trim: true
        },
        rfc:
        {
            type: String,
            required: true,
        },
        telefono:
        {
            type: String,
            required: true,
            trim: true
        },
        responsable:
        {
            type: String,
            required: true,
            trim: true
        },
        ciudad:
        {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    });
export default mongoose.model("Empresa", empresaSchema);