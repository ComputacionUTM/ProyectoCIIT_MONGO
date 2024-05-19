import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/models/Rol';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import Swal from 'sweetalert2';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
declare var $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = new Rol();
  rolNuevo: Rol = new Rol();
  pageSize = 4;
  p = 1;
  idioma: any = '1';

  constructor(private rolesService: RolesService, private cambioIdiomaService: CambioIdiomaService) {
    this.idioma = localStorage.getItem("idioma");

    console.log("idioma", this.idioma)
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        console.log("idioma actual:", this.idioma, " aaaa");
      });
  }

  ngOnInit(): void {
    console.log("entrando a oninit de roles")
    this.rolesService.list().subscribe((resRoles: any) => {
      this.roles = resRoles;
    }, err => console.error(err));

  }

  actualizarRol(id_rol: any) {
    this.rolesService.listOne(id_rol).subscribe((resRol: any) => {
      this.rol = resRol;
      console.log(this.rol)
      $('#modalModificarEmpresa').modal();
      $("#modalModificarEmpresa").modal("open");
    }, err => console.error(err));
  }
  guardarActualizarRol() {
    if ((this.rol.name_rol == '') || (this.rol.nombre_rol == '')) {
      if (this.idioma == 1) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          text: 'Existen campos vacios'
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          text: 'Empty fields exist'
        })
      }
    } else {
      this.rolesService.actualizarRol(this.rol).subscribe((res) => {
        $('#modalModificarEmpresa').modal('close');
        this.rolesService.list().subscribe((resRoles: any) => {
          this.roles = resRoles;
        }, err => console.error(err));
        if (this.idioma == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Rol Actualizado'
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Updated Rol'
          })
        }
      }, err => console.error(err));
    }

  }
  crearRol() {
    this.rolNuevo = new Rol();
    console.log("rol nuevo")
    $('#modalCrearEmpresa').modal();
    $("#modalCrearEmpresa").modal("open");
  }
  guardarNuevoRol() {
    console.log("GuardandoRol")
    if ((this.rolNuevo.name_rol == '') || (this.rolNuevo.nombre_rol == '')) {
      if (this.idioma == 1) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          text: 'Existen campos vacios'
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          text: 'Empty fields exist'
        })
      }
    } else {
      this.rolesService.crearRol(this.rolNuevo).subscribe((res) => {
        $('#modalCrearEmpresa').modal('close');
        this.rolesService.list().subscribe((resRoles: any) => {
          this.roles = resRoles;
        }, err => console.error(err));
        if (this.idioma == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Rol Creado'
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Created Rol'
          })
        }
      }, err => console.error(err));
    }
  }


  eliminarRol(id_rol: any) {
    const confirmacion = this.idioma == 1 ? {
      title: "¿Estás seguro de eliminar este Rol?",
      text: "¡Este rol depende de alguna otra tabla!, ¡CUIDADO!",
      confirmButtonText: "Sí, quiero eliminarlo!"
    } : {
      title: "Are you sure you want to delete this rol?",
      text: "This action cannot be undone!",
      confirmButtonText: "Yes, I want to delete it!"
    };
  
    const eliminacionExitosa = this.idioma == 1 ? {
      title: "¡Eliminado!",
      text: "Tu rol ha sido eliminado."
    } : {
      title: "Deleted!",
      text: "Your rol has been deleted."
    };
  
    Swal.fire({
      ...confirmacion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.eliminarRol(id_rol).subscribe((resRol: any) => {
          if (resRol.exito == -1) {
            Swal.fire({
              title: this.idioma == 1 ? "¡Error!" : "Error!",
              text: this.idioma == 1 ? "Existe una dependencia en otro registro, no es posible eliminar este rol a menos que elimine la informacion relacionada." : "There is a dependency in another record, it is not possible to delete this role unless you delete the related information.",
              icon: "error"
            });
          } else {
            this.rolesService.list().subscribe((resRol: any) => {
              this.roles = resRol;
              console.log(this.roles);
            },
            err => console.error(err)
            );
            Swal.fire({
              ...eliminacionExitosa,
              icon: "success"
            });
          }
        },
        err => console.error(err)
        );
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  


}
