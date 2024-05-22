import mongoose, { Schema, Model } from 'mongoose';


const schemaPuesto = new Schema ({
    nombre:
    {
        type: String,
        required: true,
        trim: true
    
    },
    descripcion: {
        type: String,
        required: true,
    },
    sueldo:{
        type : Number,
        required : true,
    }


},
    {
        timestamps: true
    }
)
export default mongoose.model('Puesto', schemaPuesto);