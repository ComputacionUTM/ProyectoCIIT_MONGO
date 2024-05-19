import { Component, OnInit } from '@angular/core';
import { RedesService } from './../../services/redes.service';
import { Redsocial } from 'src/app/models/red';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {
  red: Redsocial = new Redsocial();
  redNueva: Redsocial = new Redsocial();
  pageSize = 4;
  p = 1;
  liga = '';
  imgUsuario: any;
  fileToUpload: any;
  imagenActualizada = false;
  imagenUrls: { [id: number]: string } = {};
  idioma: any = 1;
  redes: Redsocial[] = [];
  constructor(private redService: RedesService, private cambioIdiomaService: CambioIdiomaService, private imagenesService: ImagenesService, private translate: TranslateService) {
    this.liga = environment.API_URI_IMAGES;
    this.redService.list().subscribe((red_social: any) => {
      this.redes = red_social
    }, err => console.error(err));
    this.idioma = localStorage.getItem("idioma");

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.modal').modal();
    });

  }
  eliminarRed(id: any) {
    if (this.idioma == 2) {
      Swal.fire({
        title: "Are you sure you want to delete?",
        text: "You won't be able to recover the information",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          this.redService.eliminarRed(id).subscribe((res: any) => {
            this.redService.list().subscribe((resRedes: any) => {
              this.redes = resRedes;
            }, err => console.error(err));
          }, err => console.error(err));
          Swal.fire(
            'Deleted',
            'The social network has been deleted',
            'success'
          );
        }
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro de eliminar?",
        text: "No podrás recuperar la información",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.redService.eliminarRed(id).subscribe((res: any) => {
            this.redService.list().subscribe((resRedes: any) => {
              this.redes = resRedes;
            }, err => console.error(err));
          }, err => console.error(err));
          Swal.fire(
            'Eliminado',
            'La red social ha sido eliminada',
            'success'
          );
        }
      });
    }
  }

  cambiarIdioma() {
  }
  // actualizarFoto(id: any) {}
  guardandoImagen() {
    // this.imgUsuario = null;
    //this.fileToUpload = null;
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log(this.red._id);
      //this.usuario.fotito = 2; 


      this.imagenesService.guardarImagen(this.red._id, "red", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;
          console.log("Usuario id: ", this.red._id);

          // Actualizar la URL de la imagen solo para el usuario actual

          this.imagenActualizada = true; // Aquí se marca la imagen como actualizada
          this.redService.actualizarFoto(this.red).subscribe((resusuario: any) => {
            console.log("foto: ", resusuario);
            this.red.foto = 2;
            if (this.red.foto === 2) {
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
  cargandoImagen(archivo: any) {
    //this.usuario.fotito = 0;
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.fileToUpload = archivo.files.item(0);
    console.log("convirtiendo imagen");
  }
  actualizarRed(id: any) {
    this.redService.listOne(id).subscribe((resRed: any) => {
      this.red = resRed;
      $("#editarRed").modal();
      $("#editarRed").modal("open");
    }, err => console.error(err));
  }

  guardarRedEditada() {
    if (this.red.nombre != '' && this.red.enlace != '') {
      this.redService.actualizarRed(this.red).subscribe((res: any) => {
        $("#editarRed").modal("close");
        this.redService.list().subscribe((resRedes: any) => {
          this.redes = resRedes;
        }, err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: this.translate.instant('Red social actualizada')
        })
      }, err => console.error(err));
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: this.translate.instant('Por favor rellene todos los campos.')
      });
    }
  }

  mostrarImagen(id: any) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.redService.listOne(id).subscribe((resRed: any) => {
      this.red = resRed;
      console.log("Primer usuario: ", this.red._id);
      $('#Imagen').modal();
      $("#Imagen").modal("open");
    }, err => console.error(err));

  }

  agregarRed() {
    this.redNueva = new Redsocial();
    $("#nuevaRed").modal();
    $("#nuevaRed").modal("open");
  }

  guardarRed() {
    if (this.redNueva.nombre != '' && this.redNueva.enlace != '') {
      console.log("Entró a agregar Red");
      this.redService.crearRed(this.redNueva).subscribe((res) => {
        $("#nuevaRed").modal("close");
        this.redService.list().subscribe((resRedes: any) => {
          this.redes = resRedes;
        }, err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: this.translate.instant('Red social agregada')
        });
      }, err => console.error(err));
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: this.translate.instant('Por favor rellene todos los campos.')
      });
    }
  }



}
