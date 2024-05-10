import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  enviarCorreoRecuperarContrasena(body: any) {
    return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasena`, body);
  }

  decodificarEmail(token: any) {
    let data = { "token": token };
    return this.http.post(`${environment.API_URI_CORREOS}/decodificarCorreo`, data);
  }

  verificarCorreo(correo: any) {
    return this.http.get(`${environment.API_URI}/usuarios/obtenerUsuarioCorreo/${correo}`);
  }
}
