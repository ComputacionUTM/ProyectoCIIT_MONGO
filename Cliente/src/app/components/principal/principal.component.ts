import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
declare var M: any; // Declarar M para acceder a Materialize desde TypeScript

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  idioma: any = 2;
  constructor(private el: ElementRef,private cambioIdiomaService: CambioIdiomaService) { 
    console.log("estoy en constructor de principal")
    this.idioma = 2;
        this.cambioIdiomaService.currentMsg$.subscribe(
            (msg) => {
                this.idioma = msg;
                console.log("idioma actual:", this.idioma, " aaaa");
            });
  }

  ngOnInit(): void {
    // No inicialices el carrusel aquí
    console.log("oninit de principal")
  }

  ngAfterViewInit(): void {
    // Inicializa el carrusel después de que la vista haya sido inicializada
    const carouselElem = this.el.nativeElement.querySelector('.carousel');
    M.Carousel.init(carouselElem, {});
  }

}
