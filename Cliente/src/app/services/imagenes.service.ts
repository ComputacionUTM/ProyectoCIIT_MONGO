import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) { }

  guardarImagen(id: any, tipo: any, src: any) {
    return this.http.post(`${environment.API_URI_IMAGES}/uploadImagen`, {
      "id": id,
      "tipo": tipo,
      "src": src
    });
  }

}
