import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CorreoService } from 'src/app/services/correo.service';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent implements OnInit {

  correo: string = "";
  idioma: any;

  constructor(private router: Router, private correosService: CorreoService, private translate: TranslateService) {
    this.correo = "";
  }

  ngOnInit(): void {
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
    this.idioma = localStorage.getItem('idioma');
    this.verificarIdioma();
  }

  volverInicio() {
    this.router.navigateByUrl('/login');
  }

  enviarCorreo() {
    this.correosService.verificarCorreo(this.correo).subscribe((res: any) => {
      this.idioma = localStorage.getItem('idioma');
      this.verificarIdioma();
      if (res && res.length > 0) {
        Swal.fire({
          title: this.translate.instant('Correo enviado'),
          text: this.translate.instant('Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña'),
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.correosService.enviarCorreoRecuperarContrasena({ Email: this.correo }).subscribe((res: any) => {
          console.log('Correo enviado:', res);
        }, error => {

        });
      } else {

        Swal.fire({
          title: this.translate.instant('Correo no encontrado'),
          text: this.translate.instant('No te encuentras registrado en el sistema o el correo que proporcionaste es incorrecto'),
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    }, error => {

      console.error('Error al verificar el correo:', error);
      Swal.fire({
        title: this.translate.instant('Error'),
        text: this.translate.instant('Hubo un problema al enviar el correo electrónico'),
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

    });

  }
  setIdioma(idioma: any) {
    localStorage.removeItem('idioma');
    if (idioma == 1) {
      this.translate.use("es");
    }
    if (idioma == 2) {
      this.translate.use("en");
    }
    localStorage.setItem('idioma', idioma.toString());
  }
  verificarIdioma() {
    if (this.idioma == 1)
      this.translate.use("es");
    if (this.idioma == 2)
      this.translate.use("en");
  }
}
