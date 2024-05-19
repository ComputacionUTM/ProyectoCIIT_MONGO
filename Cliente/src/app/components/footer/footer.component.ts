import { Component, OnInit } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { Router } from '@angular/router';
import { RedesService } from 'src/app/services/redes.service';
import { Redsocial } from 'src/app/models/red';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  idioma: any = '1';
  redes_sociales: Redsocial[] = [];
  liga = '';

  constructor(private redService: RedesService  ,private cambioIdiomaService: CambioIdiomaService, private router: Router) { 
    this.idioma = localStorage.getItem("idioma");
    this.liga = environment.API_URI_IMAGES;

  }

  ngOnInit(): void {
    $('.tooltipped').tooltip();
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem('idioma')
        console.log("idioma actual del footer:", this.idioma, " aaaa");
      });
      this.redService.list().subscribe((red_social: any) => {
        this.redes_sociales  = red_social
      }, err => console.error(err));
      

  }
  getTooltip() {
    if (this.idioma === '1') {
      return 'Agregar red social';
    }
    if (this.idioma === '2') {
      return 'Add social networks';
    }
    
    return ''; // Add a default return statement
  }
  redes()
  {
    this.router.navigateByUrl('/home/redes');
  }

}
