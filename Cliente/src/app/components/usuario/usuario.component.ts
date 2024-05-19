
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/models/Rol';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();
  usuarioNuevo: Usuario = new Usuario();
  urlImagen: any;
  roles: Rol[] = []
  pageSize = 4;
  p = 1;
  liga = '';
  imgUsuario: any;
  fileToUpload: any;
  imagenActualizada = false;
  imagenUrls: { [id: number]: string } = {};
  idioma: any = 1;

  constructor(private imagenesService: ImagenesService, private usuarioService: UsuarioService, private rolesService: RolesService, 
    private cambioIdiomaService: CambioIdiomaService,private translate: TranslateService) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.liga = environment.API_URI_IMAGES;
    this.idioma = localStorage.getItem("idioma");

    /*this.cambioIdiomaService.currentMsg$.subscribe(
        (msg) => {
            this.idioma = msg;
            console.log("idioma actual:", this.idioma, " aaaa");
        });*/
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.modal').modal();
    });
    this.usuarioService.list().subscribe((resUsuarios: any) => {
      this.usuarios = resUsuarios;
      this.rolesService.list().subscribe((resRoles: any) => {
        this.roles = resRoles;
        console.log("roles:", this.roles);
      }, err => console.error(err));
    }, err => console.error(err));
  }

  // Método para actualizar la variable 'liga' cuando se seleccione un usuario
  seleccionarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    //this.liga = environment.API_URI_IMAGES + "/usuarios/" + this.usuario.id + ".jpg";
  }

  crearUsuario() {
    //Limpiar el usuarioNuevo de los valores que tiene el modelo por defecto
    this.usuarioNuevo = new Usuario();
    this.usuarioNuevo.nombre = "";
    this.usuarioNuevo.correo = "";
    this.usuarioNuevo.contrasena = "";
    $("#modalCrearUsuario").modal('open');
  }

  // Método para guardar un nuevo usuario
  
  guardarNuevoUsuario() {

    if (this.usuarioNuevo.nombre != "" && this.usuarioNuevo.correo != "" && this.usuarioNuevo.contrasena != "") {
      this.usuarioService.crearUsuario(this.usuarioNuevo).subscribe((res:any) => 
        {
          if(res!=false)//Si el correo ya existe no se inserta
        {
          var id_usuario = res.insertId;

          if(this.fileToUpload!=null )
            {

              this.guardarImagen(id_usuario);
            }

          $('#modalCrearUsuario').modal('close');
        this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
        }, err => console.error(err));
        this.translate.get('usuarioCreado').subscribe((translations) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: translations.title,
            text: translations.text,
            showConfirmButton: true,
            confirmButtonText: translations.confirmButtonText
          }).then((result) => {
            window.location.reload();//Recarga la página
          });

        });

      }

      else{
        this.translate.get('emailRegistrado').subscribe((translations) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: translations.title,
            text: translations.text,
            showConfirmButton: true,
            confirmButtonText: translations.confirmButtonText
          });
        });
      }
      }
      , 
      err => console.error(err));
    }
    else {
        this.translate.get('rellenarCampos').subscribe((translations) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: translations.title,
            text: translations.text,
            showConfirmButton: true,
            confirmButtonText: translations.confirmButtonText
          });
        });
    }
  }


  actualizarUsuario(id_usuario: any) {
    this.usuarioService.listOne(id_usuario).subscribe((resUsuario: any) => {
      this.usuario = resUsuario;
      this.seleccionarUsuario(this.usuario)
      $('#modalModificarUsuario').modal();
      $("#modalModificarUsuario").modal("open");
    }, err => console.error(err));
  }

  mostrarImagen(id_usuario: any) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.usuarioService.listOne(id_usuario).subscribe((resUsuario: any) => {
      this.usuario = resUsuario;
      console.log("Primer usuario: ", this.usuario.id);
      $('#Imagen').modal();
      $("#Imagen").modal("open");
    }, err => console.error(err));
  }


  guardarActualizarUsuario() {

    if (this.usuario.nombre != "" && this.usuario.correo != "" ) {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((res) => {
      $('#modalModificarUsuario').modal('close');
      this.usuarioService.list().subscribe((resUsuarios: any) => {
        this.usuarios = resUsuarios;
      }, err => console.error(err));
      this.translate.get('usuarioActualizado').subscribe((translations) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: translations.title,
          text: translations.text,
          showConfirmButton: true,
          confirmButtonText: translations.confirmButtonText
        }).then((result) => {
          window.location.reload();//Recarga la página
        });

      });
    }, err => console.error(err));
    }
    else {
      this.translate.get('rellenarCampos').subscribe((translations) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: translations.title,
          text: translations.text,
          showConfirmButton: true,
          confirmButtonText: translations.confirmButtonText
        });
      });
    }
  }

  eliminarUsuario(id: any) {//Ya quedó
    this.translate.get('eliminarUsuario').subscribe((translations) => {
      Swal.fire({
        title: translations.title,
        text: translations.text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: translations.confirmButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe((resusuario: any) => {
            this.usuarioService.list().subscribe((resusuario: any) => {
              this.usuarios = resusuario;
              this.translate.get('usuarioEliminado').subscribe((translations) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: translations.title,
                  text: translations.text,
                  showConfirmButton: true,
                  confirmButtonText: translations.confirmButtonText
                })
              });
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );}
      });
    });
  }

  metodoPrueba() {
    console.log(this.usuarios);
  }


  cargandoImagen(archivo: any) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.fileToUpload = archivo.files.item(0);

  }
  guardarImagen(idUsuario?: any) {
    if (idUsuario>0) {//se crea un nuevo usuario
      this.usuarioService.listOne(idUsuario).subscribe((resUsuario: any) => {
        this.usuario = resUsuario;
      }); //Se obtiene el usuario creado
      this.usuario.id = idUsuario;
    }
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log(this.usuario.id);
      this.imagenesService.guardarImagen(this.usuario.id, "usuarios", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;
          this.usuarioService.actualizarFotito(this.usuario).subscribe((resusuario: any) => {
            this.usuario.fotito = 2;
            if (this.usuario.fotito === 2) {
              console.log(this.liga);
            }
          }, err => console.error(err));

        },
        err => console.error(err)
      );
    });
  }


  guardandoImagen() {
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log(this.usuario.id);
      this.imagenesService.guardarImagen(this.usuario.id, "usuarios", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;

          this.imagenActualizada = true; // Aquí se marca la imagen como actualizada
          this.usuarioService.actualizarFotito(this.usuario).subscribe((resusuario: any) => {
            this.usuario.fotito = 2;
          }, err => console.error(err));
          
          this.translate.get('imagenActualizada').subscribe((translations) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: translations.title,
              text: translations.text,
              showConfirmButton: true,
              confirmButtonText: translations.confirmButtonText
            }).then((result) => {
              window.location.reload();//Recarga la página
            });
          });

        },
        err => console.error(err)
      );
    });

  }



  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          resolve(e.target?.result);
        };

      })(file);
      reader.readAsDataURL(file);
    });

  }
}

