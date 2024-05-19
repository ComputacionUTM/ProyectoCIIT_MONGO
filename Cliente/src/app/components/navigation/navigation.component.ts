import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
declare var $: any;


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  idioma:any;
  mostrar:any
  constructor(private router: Router, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) {
    this.mostrar = localStorage.getItem("id_Rol");
    this.translate.addLangs(["es","en"]);
    console.log("estoy en el constructor de navigation")
    this.idioma=localStorage.getItem("idioma");
    if(this.idioma==1){
      this.translate.setDefaultLang("es");
    }
    if(this.idioma==2){
      this.translate.setDefaultLang("en");
    }
    console.log(this.idioma);
   }

  ngOnInit(): void {
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
    console.log("estoy en oninit de navigation")
  }

  logout() {
    console.log("Cerrando sesion");
    localStorage.removeItem("id_Rol")
    localStorage.removeItem("correo")
    this.router.navigateByUrl('');
    localStorage.removeItem("idioma")
  }

  enviarMensajeIdioma(idioma:any)
  {
    this.cambioIdiomaService.sendMsg(idioma);
  }
  
  setIdioma(idioma: any) {
    if (idioma == 1){
      this.translate.use("es");
      this.enviarMensajeIdioma(1);
      localStorage.setItem("idioma","1")
    }  
    if (idioma == 2){
      this.translate.use("en");
      this.enviarMensajeIdioma(2);
      localStorage.setItem("idioma","2")
    }
    window.location.reload(); 
  }

}
