import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { Noticia } from 'src/app/models/Noticias';
import { NoticiasComponent } from '../noticias/noticias.component';
import { NoticiaService } from 'src/app/services/noticia.service';
import Swal from 'sweetalert2';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
declare var M: any; // Declarar M para acceder a Materialize desde TypeScript

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  noticias: Noticia[] = [];
  noticiaSelc: any = {};
  idNoticiaSeleccionada: any;
  noticia: Noticia = new Noticia();
  noticiaNueva: Noticia = new Noticia();
  pageSize = 10;
  p = 1;
  idioma: any = '1';
  liga = '';
  imgNoticia: any;
  imgEmpresa: any;
  fileToUpload: any;
  imagenActualizada = false;
  imagenUrls: { [id: number]: string } = {};
  noticiaSeleccionada: any;


  constructor(private translate: TranslateService,private imagenesService: ImagenesService, private noticiaService: NoticiaService,private el: ElementRef,private cambioIdiomaService: CambioIdiomaService) { 
    console.log("estoy en constructor de principal")
    this.idioma = 2;
        this.cambioIdiomaService.currentMsg$.subscribe(
            (msg) => {
                this.idioma = msg;
                console.log("idioma actual:", this.idioma, " aaaa");
            });

            this.liga = environment.API_URI_IMAGES;
            this.idioma = localStorage.getItem("idioma");
            this.imgNoticia = null;
            this.fileToUpload = null;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('id_noticia_seleccionada')) {
      // Si no está definida, inicializarla con el valor predeterminado de 1
      localStorage.setItem('id_noticia_seleccionada', '1');
    } 
    // No inicialices el carrusel aquí
    console.log("oninit de principal")
    $(document).ready(function () {
      $('select').formSelect();
    });
    this.noticiaService.list().subscribe((resNoticias: any) => {
      this.noticias = resNoticias;
    }, err => console.error(err));

    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem('idioma')
        console.log("idioma actual:", this.idioma, " aaaa");
      });

      const idNoticiaSeleccionada = localStorage.getItem('id_noticia_seleccionada');

      // Verificar si hay un ID de noticia seleccionada en el localStorage
      if (idNoticiaSeleccionada) {
        // Obtener la noticia correspondiente al ID almacenado
        this.noticiaService.listOne(idNoticiaSeleccionada).subscribe(
          (res: any) => {
            this.noticia = res;
          },
          (err: any) => {
            console.error(err);
          }
        );
      } else {
        console.log("No se encontró un ID de noticia seleccionada en el localStorage.");
      }
    
       
  }

  ngAfterViewInit(): void {
    // Inicializa el carrusel después de que la vista haya sido inicializada
    const carouselElem = this.el.nativeElement.querySelector('.carousel');
    M.Carousel.init(carouselElem, {});
  }

}
