import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UsuarioService {
constructor(private http: HttpClient) { }

list() {
  return this.http.get(`${environment.API_URI}/usuarios/mostrarTodosUsuarios`);
}

existe(correo : any, password : any){ 
  return this.http.post(`${environment.API_URI}/login/login`,{"correo":correo, "password":password});
  //return this.http.post(`${environment.API_URI}/usuarios/ValidarUsuario`,{"correo":correo, "contrasena":password});
}

perfil(){ 
  return this.http.get(`${environment.API_URI}/login/perfil`);
  //return this.http.post(`${environment.API_URI}/usuarios/ValidarUsuario`,{"correo":correo, "contrasena":password});
}
eliminarUsuario(id : any){ 
  return this.http.delete(`${environment.API_URI}/usuarios/eliminarUsuario/${id}`);
}
listOne(id_usuario : any){
  return this.http.get(`${environment.API_URI}/usuarios/obtenerUsuario/${id_usuario}`)
}

crearUsuario(usuario:any)
{
    console.log("Entrando al servicio de crear Usuario");
return this.http.post(`${environment.API_URI}/usuarios/crearUsuario`,usuario);
}

actualizarUsuario(usuario:any)
{
return this.http.put(`${environment.API_URI}/usuarios/actualizarUsuario/${usuario.id}`,
usuario);
}

actualizarContrasena(token:any, contrasena:any){
  return this.http.put(`${environment.API_URI}/usuarios/reestablecerContrasena/${token}`,{"contrasena":contrasena});
}

actualizarFotito(usuario:any)
{
return this.http.put(`${environment.API_URI}/usuarios/actualizarFotito/${usuario.id}`,
usuario);
}

}