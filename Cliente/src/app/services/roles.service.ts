import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get(`${environment.API_URI}/roles/mostrarTodosRoles`);
  }
  listOne(id_rol: any) {
    return this.http.get(`${environment.API_URI}/roles/obtenerRol/${id_rol}`);
  }
  actualizarRol(rol: any) {
    return this.http.put(`${environment.API_URI}/roles/actualizarRol/${rol.id_rol}`,
      rol);
  }
  crearRol(rol: any) {
    console.log("Entrando al servicio de crear roles");
    return this.http.post(`${environment.API_URI}/roles/crearRol`, rol);
  }
  eliminarRol(id_rol: any) {
    console.log("Eliminando un rol");
    return this.http.delete(`${environment.API_URI}/roles/eliminarRol/${id_rol}`, id_rol);
  }
}
