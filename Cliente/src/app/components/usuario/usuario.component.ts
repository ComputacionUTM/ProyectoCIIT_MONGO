
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
  roles: Rol[] = []
  pageSize = 4;
  p = 1;
  liga = '';
  imgUsuario: any;
  fileToUpload: any;
  imagenActualizada = false;
  imagenUrls: { [id: number]: string } = {};
  idioma: any = 1;

  constructor(private imagenesService: ImagenesService, private usuarioService: UsuarioService, private rolesService: RolesService, private cambioIdiomaService: CambioIdiomaService) {
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
    this.usuarioNuevo = new Usuario();
    $("#modalCrearUsuario").modal('open');
  }

  // Método para guardar un nuevo usuario
  
  guardarNuevoUsuario() {
    console.log("GuardandoUsuario")
    if (this.usuarioNuevo.nombre != "" && this.usuarioNuevo.correo != "" && this.usuarioNuevo.contrasena != "") {
      console.log("entro")
      this.usuarioService.crearUsuario(this.usuarioNuevo).subscribe((res) => {
        $('#modalCrearUsuario').modal('close');
        this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
        }, err => console.error(err));
        if (this.idioma == 2) {
          console.log("Eh wey, estás ahí?")
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: "User Created"
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Usuario Creado'
          })
        }
      }, err => console.error(err));
    }
    else {
      if (this.idioma == '1') {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Por favor rellene todos los campos'
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Please fill all inputs'
        });
    }
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
      if (this.idioma == 2) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: "Updated User"
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Usuario Actualizado'
        })
      }
    }, err => console.error(err));
    }
    else {
      if (this.idioma == '1') {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Por favor rellene todos los campos'
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Please fill all inputs'
        });
    }
    }
  }

  eliminarUsuario(id: any) {
    console.log("Click en eliminar usuario");
    console.log("Identificador del usuario: ", id);
    if (this.idioma == 2) {
      Swal.fire({
        title: "Are you sure to delete this user?",
        text: "It is not possible to reverse this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe((resusuario: any) => {
            console.log("resusuario: ", resusuario);
            this.usuarioService.list().subscribe((resusuario: any) => {
              this.usuarios = resusuario;
              //console.log(resusuario);
              console.log(this.usuarios)
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );


          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted",
            icon: "success"
          });
        }
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro de eliminar este usuario?",
        text: "¡No es posible revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe((resusuario: any) => {
            console.log("resusuario: ", resusuario);
            this.usuarioService.list().subscribe((resusuario: any) => {
              this.usuarios = resusuario;
              //console.log(resusuario);
              console.log(this.usuarios)
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );


          Swal.fire({
            title: "Eliminado!",
            text: "Tu archivo ha sido eliminado.",
            icon: "success"
          });
        }
      });

    }


  }

  metodoPrueba() {
    console.log(this.usuarios);
  }


  cargandoImagen(archivo: any) {
    //this.usuario.fotito = 0;
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.fileToUpload = archivo.files.item(0);
    console.log("convirtiendo imagen");
  }


  guardandoImagen() {
    // this.imgUsuario = null;
    //this.fileToUpload = null;
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log(this.usuario.id);
      //this.usuario.fotito = 2; 


      this.imagenesService.guardarImagen(this.usuario.id, "usuarios", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;
          console.log("Usuario id: ", this.usuario.id);

          // Actualizar la URL de la imagen solo para el usuario actual

          this.imagenActualizada = true; // Aquí se marca la imagen como actualizada
          this.usuarioService.actualizarFotito(this.usuario).subscribe((resusuario: any) => {
            console.log("fotito: ", resusuario);
            this.usuario.fotito = 2;
            if (this.usuario.fotito === 2) {
              console.log(this.liga);

              //this.liga= environment.API_URI_IMAGES + '/usuarios/' + this.usuario.id + '.jpg?t=';
              //console.log("liga de los amigos: ",this.liga);

            }
          }, err => console.error(err));

        },
        err => console.error(err)
      );
    });

    if (this.idioma == 1) {
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
}

