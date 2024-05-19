import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    constructor(private http: HttpClient) { }
    list() {
        return this.http.get(`${environment.API_URI}/empresas/MostrarTodasEmpresas`);
    }
    listOne(id_empresa: any) {
        return this.http.get(`${environment.API_URI}/empresas/ListOneEmpresa/${id_empresa}`);
    }
    actualizarEmpresa(empresa: any) {
        return this.http.put(`${environment.API_URI}/empresas/actualizarEmpresa/${empresa.id_empresa}`,
            empresa);
    }
    crearEmpresa(empresa: any) {
        console.log("Entrando al servicio de crear empresas");
        return this.http.post(`${environment.API_URI}/empresas/crearEmpresa`, empresa);
    }
    eliminarEmpresa(id_empresa: any) {
        console.log("Eliminando una empresa");
        return this.http.delete(`${environment.API_URI}/empresas//eliminarEmpresa/${id_empresa}`, id_empresa);
    }
    actualizarFotito(empresa:any){
    return this.http.put(`${environment.API_URI}/empresas/actualizarFotito/${empresa.id_empresa}`,
    empresa);
    }

    inserta_datos_foto(empresa: any) {
        return this.http.post(`${environment.API_URI}/empresas/inserta_datos_foto`, empresa);
    }

    id_fotos_por_empresa(id: any) {
        return this.http.get(`${environment.API_URI}/empresas/id_fotos_por_empresa/${id}`);
    }

}