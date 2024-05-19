import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedesService {

  constructor(private http: HttpClient) { }

list() {
  return this.http.get(`${environment.API_URI}/red_social/mostrarTodosRedes/`);
}



eliminarRed(id : any){
  return this.http.delete(`${environment.API_URI}/red_social/eliminarRedSocial/${id}`);
}
listOne(id_red : any){
  return this.http.get(`${environment.API_URI}/red_social/obtenerRedSocial/${id_red}`);
}

crearRed(Red:any)
{
    console.log("Entrando al servicio de crear Red");
return this.http.post(`${environment.API_URI}/red_social/crearRedSocial/`,Red);
}

actualizarRed(Red:any)
{
return this.http.put(`${environment.API_URI}/red_social/actualizarRedSocial/${Red.id}`,
Red);
}

actualizarFoto(red:any)
{
return this.http.put(`${environment.API_URI}/red_social/actualizarFoto/${red.id}`,
red);
}
}
