export class Empresa{
    id_empresa: number;
    nombre_empresa : string;
    direccion: string;
    rfc: string;
    telefono: string;
    fecha : string;
    descripcion: string;
    description: string;
    fotito: number;

    constructor() {
        this.id_empresa = 0;
        this.nombre_empresa = '';
        this.direccion = '';
        this.rfc = '';
        this.telefono = '';
        this.fecha = '';
        this.descripcion= '';
        this.description='';
        this.fotito= 0;
    }
}