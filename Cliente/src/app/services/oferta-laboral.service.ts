import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaLaboralService {

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${environment.API_URI}/ofertaLaboral/mostrarTodosOfertasLaborales`);
  }
  listOne(id_empresa: any) {
    return this.http.get(`${environment.API_URI}/ofertaLaboral/obtenerOferta/${id_empresa}`);
  }
  actualizarOferta(oferta: any) {
    return this.http.put(`${environment.API_URI}/ofertaLaboral/actualizarOferta/${oferta.idOferta}`,
      oferta);
  }
  crearOferta(empresa: any) {
    console.log("Entrando al servicio de crear ofertaLaboral");
    return this.http.post(`${environment.API_URI}/ofertaLaboral/createOferta`, empresa);
  }
  eliminarOferta(id_empresa: any) {
    console.log("Eliminando una empresa");
    return this.http.delete(`${environment.API_URI}/ofertaLaboral/eliminarOferta/${id_empresa}`, id_empresa);
  }
}
