import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get(`${environment.API_URI}/noticias/MostrarNoticias`);
  }
  listOne(id_noticia: any) {
      return this.http.get(`${environment.API_URI}/noticias/ListOne/${id_noticia}`);
  }
  actualizarNoticia(noticias: any) {
      return this.http.put(`${environment.API_URI}/noticias/actualizarNoticia/${noticias.id_noticia}`,noticias);
  }
  crearNoticia(noticias: any) {
      console.log("Entrando al servicio de crear noticias");
      return this.http.post(`${environment.API_URI}/noticias/crearNoticia`, noticias);
  }
  eliminarNoticia(id_noticia: any) {
      console.log("Eliminando una empresa");
      return this.http.delete(`${environment.API_URI}/noticias//eliminarNoticia/${id_noticia}`, id_noticia);
  }
  actualizarFotito(noticias:any){
  return this.http.put(`${environment.API_URI}/noticias/actualizarFoto/${noticias.id_noticia}`,noticias);
  }
}
