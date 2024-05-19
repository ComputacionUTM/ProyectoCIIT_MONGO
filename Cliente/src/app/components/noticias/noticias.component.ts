import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/Noticias';
import { TranslateService } from '@ngx-translate/core';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from 'src/app/models/Empresa';
import Swal from 'sweetalert2';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
declare var $: any;
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
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

  constructor(private translate: TranslateService,private imagenesService: ImagenesService, private noticiaService: NoticiaService, private cambioIdiomaService: CambioIdiomaService) { 
    this.liga = environment.API_URI_IMAGES;
    this.idioma = localStorage.getItem("idioma");
    this.imgNoticia = null;
    this.fileToUpload = null;
    if (this.noticias.length > 0) {
      // Asigna el ID de la primera noticia como seleccionada por defecto
      this.idNoticiaSeleccionada = this.noticias[0].id_noticia;
    }


    
    console.log("idioma", this.idioma)
    this.cambioIdiomaService.currentMsg$.subscribe(
        (msg) => {
            if (msg != '') {
                this.idioma = msg;
            }
            console.log("idioma actual:", this.idioma, " aaaa");
            if (this.idioma !== '2') {
                console.log("idioma actual:", this.idioma);
            }
            else if (this.idioma === '2') {
                console.log("idioma actual:", this.idioma);
            }
        });
  }

  ngOnInit(): void {

    const idNoticiaLocalStorage = localStorage.getItem('id_noticia_seleccionada');
    // Verificar si hay un valor almacenado en el localStorage y si está en el arreglo de noticias
   
      // Establecer el valor del localStorage como la noticia seleccionada
      this.idNoticiaSeleccionada = idNoticiaLocalStorage;
      console.log("idseleccionada", this.idNoticiaSeleccionada)

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

      this.noticiaSeleccionada = this.noticias[0];
  }



  seleccionarNoticia(){
    if (this.idNoticiaSeleccionada) {
      localStorage.setItem('id_noticia_seleccionada', this.idNoticiaSeleccionada);
      Swal.fire({
        icon: 'success',
        text: this.translate.instant('Noticia seleccionada'),
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  mostrarImagen(id_noticia: any) {
    this.imgNoticia = null;
    this.fileToUpload = null;
    this.noticiaService.listOne(id_noticia).subscribe((resNoticia: any) => {
      this.noticia = resNoticia;
      $('#Imagen').modal();
      $("#Imagen").modal("open");
    }, err => console.error(err));
  }

  cargandoImagen(archivo: any) {
    //this.usuario.fotito = 0;
    this.imgNoticia = null;
    this.fileToUpload = null;
    this.fileToUpload = archivo.files.item(0);
    console.log("convirtiendo imagen noticia");
  }


  guardandoImagen() {
    // this.imgUsuario = null;
    //this.fileToUpload = null;
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      //this.usuario.fotito = 2; 


      this.imagenesService.guardarImagen(this.noticia.id_noticia, "noticias", blob).subscribe(
        (res: any) => {
          this.imgNoticia = blob;

          // Actualizar la URL de la imagen solo para el usuario actual

          this.imagenActualizada = true; // Aquí se marca la imagen como actualizada
          this.noticiaService.actualizarFotito(this.noticia).subscribe((resNoticia: any) => {
            console.log("fotito: ", resNoticia);
            this.noticia.foto = 2;
            if (this.noticia.foto === 2) {
              console.log(this.liga);

              //this.liga= environment.API_URI_IMAGES + '/usuarios/' + this.usuario.id + '.jpg?t=';
              //console.log("liga de los amigos: ",this.liga);

            }
          }, err => console.error(err));

        },
        err => console.error(err)
      );
    });

    if (this.idioma == 2) {
      Swal.fire({
        title: "Updated",
        text: "Your image has been updated",
        icon: "success", didClose: () => { window.location.reload(); }

      });
    } else {
      Swal.fire({
        title: "Actualizado",
        text: "Tu imagen se ha actualizado",
        icon: "success", didClose: () => { window.location.reload(); }
      });

    }
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          // console.log(e.target?.result)
          resolve(e.target?.result);
        };

      })(file);
      reader.readAsDataURL(file);
    });

  }



  actualizarNoticia(id_noticia : any){
    this.noticiaService.listOne(id_noticia).subscribe((resNoticia: any) => {
      this.noticia = resNoticia;

      console.log(this.noticia)
      $('#modalModificarNoticia').modal();
      $("#modalModificarNoticia").modal("open");
    }, err => console.error(err));
  }


crearNoticia(){

  this.noticiaNueva = new Noticia();
  this.noticiaService.list().subscribe((resNoticia: any) => {
    this.noticias = resNoticia;
    console.log("ofertaNueva.id_empresa click: ", this.noticiaNueva.id_noticia)
  }, err => console.log(err));
  console.log("oferta nueva")
  $('#modalCrearNoticia').modal();
  $("#modalCrearNoticia").modal("open");

}


guardarActualizarNoticia(){
  if (
    this.noticia.id_noticia != 0 &&
    this.noticia.titulo &&
    this.noticia.title &&
    this.noticia.informacion &&
    this.noticia.information 
  ) {
    // Todos los campos requeridos están llenos, proceder con la actualización
    this.noticiaService.actualizarNoticia(this.noticia).subscribe((res) => {
      $('#guardarActualizarNoticia').modal('close');
      this.noticiaService.list().subscribe((resNoticias: any) => {
        this.noticias = resNoticias;
      }, err => console.error(err));
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: this.translate.instant('Noticia actualizada')
      })
    }, err => console.error(err));
  } else {
    // Mostrar mensaje de advertencia si algún campo requerido está vacío
    Swal.fire({
      icon: 'warning',
      title: this.translate.instant('Campos incompletos'),
      text: this.translate.instant('Por favor, complete todos los campos requeridos antes de actualizar la oferta.')
    });
    // No cerrar el modal si los campos no están completos
    // (no es necesario agregar código aquí porque el modal ya no se cerrará)
  }
}


guardarNuevaNoticia(){

    console.log("GuardandoNoticia")
    this.noticiaService.crearNoticia(this.noticiaNueva).subscribe((res) => {
      $('#modalCrearNoticia').modal('close');
      this.noticiaService.list().subscribe((resNoticias: any) => {
        this.noticias = resNoticias;
      }, err => console.error(err));
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: this.translate.instant('Noticia creada')
      })
    }, err => console.error(err));

}

eliminarNoticia(id_noticia: any) {
  Swal.fire({
    title: this.translate.instant("¿Estás seguro de eliminar esta Noticia?"),
    text: this.translate.instant("¡No es posible revertir esta acción!"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: this.translate.instant("Sí, quiero eliminarla!"),
    cancelButtonText: this.translate.instant("Cancelar")
  }).then((result) => {
    if (result.isConfirmed) {
      this.noticiaService.eliminarNoticia(id_noticia).subscribe((resOferta: any) => {
        this.noticiaService.list().subscribe((resNoticia: any) => {
          this.noticias = resNoticia;
        },
          err => console.error(err)
        );
      },
        err => console.error(err)
      );


      Swal.fire({
        title: this.translate.instant("¡Eliminado!"),
        text: this.translate.instant("La noticia ha sido eliminada"),
        icon: "success"
      });
    }
  });

}

}
