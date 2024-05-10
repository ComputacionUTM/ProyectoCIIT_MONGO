export class OfertaLaboral{
    idOferta: number;
    salario: number;
    puesto: String;
    position: String;
    id_empresa: number;
    descripcion: String;
    description: String;
    horario: String;
    constructor() {
        this.idOferta = 0;
        this.salario=0;
        this.puesto='';
        this.position='';
        this.id_empresa=0;
        this.descripcion='';
        this.description='';
        this.horario=''
    }
     atributoVacioONulo(obj: OfertaLaboral): boolean {

        if (  obj.salario ==null || obj.puesto == '' || obj.position == ''  || obj.descripcion == '' || obj.description == '' || obj.horario == '') 
            {
            return false;
        }

        return true;
    }
}