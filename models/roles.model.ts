import mongoose, { Schema, Model } from 'mongoose';

interface Roles {
    nombre_rol: string;
    name_rol:string;
    createdAt: Date;
    updatedAt: Date;
}
const schemaRoles = new Schema<Roles>({
    nombre_rol:
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name_rol:
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
},
    {
        timestamps: true
    }
)
export default mongoose.model('Roles', schemaRoles);