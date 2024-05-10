import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";

declare var $: any;


@Component({
  selector: 'app-reestablecer-contrasena',
  templateUrl: './reestablecer-contrasena.component.html',
  styleUrls: ['./reestablecer-contrasena.component.css']
})
export class ReestablecerContrasenaComponent implements OnInit {
  token : string = "";
  nuevaContrasena : string = "";
  nuevaContrasenaConfirmacion : string = "";
  idioma:any;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute,private translate: TranslateService) {
    this.nuevaContrasena = "";
    this.nuevaContrasenaConfirmacion = "";
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token); 
    });
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
    this.idioma = localStorage.getItem('idioma');
    this.verificarIdioma();
  }

  actualizarContrasena(){
    this.idioma = localStorage.getItem('idioma');
    this.verificarIdioma();
    console.log(this.nuevaContrasena);
    console.log(this.nuevaContrasenaConfirmacion);

    if (this.nuevaContrasena == "" || this.nuevaContrasenaConfirmacion == ""){
      Swal.fire({
        title: this.translate.instant('Error'),
        text: this.translate.instant('Por favor llene todos los campos'),
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }else{
      if (this.nuevaContrasena != this.nuevaContrasenaConfirmacion){
        Swal.fire({
          title: this.translate.instant('Error'),
          text: this.translate.instant('Las contraseñas no coinciden'),
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        return;
      }else{
        this.usuarioService.actualizarContrasena(this.token, this.nuevaContrasena).subscribe((res : any) => {
          console.log(res);
          Swal.fire({
            title: this.translate.instant('Actualización exitosa'),
            text: this.translate.instant('Se ha actualizado su contraseña'),
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }, err => console.error(err));
      }


    }
    
  }
  setIdioma(idioma:any) {
    localStorage.removeItem('idioma');
    if (idioma == 1){
      this.translate.use("en");
    }
    if (idioma == 2){
      this.translate.use("es");
    }
    localStorage.setItem('idioma', idioma.toString());
  }
  verificarIdioma(){
    if(this.idioma == 1)
      this.translate.use("en");
    if(this.idioma == 2)
      this.translate.use("es");
  }

}
