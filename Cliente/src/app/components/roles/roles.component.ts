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
          if(msg != ''){
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
    if ((this.rol.name_rol=='') || (this.rol.nombre_rol=='')){
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
    }else{
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
    if ((this.rolNuevo.name_rol=='') || (this.rolNuevo.nombre_rol=='')){
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
    }else{
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
    console.log("Click en eliminar Rol");
    console.log("Identificador del Rol: ", id_rol);
    if (this.idioma == 1) {
      Swal.fire({
        title: "¿Estás seguro de eliminar este Rol?",
        text: "¡Este rol depende de alguna otra tabla!, ¡CUIDADO!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.rolesService.eliminarRol(id_rol).subscribe((resRol: any) => {
            console.log("resRol: ", resRol);
            this.rolesService.list().subscribe((resRol: any) => {
              this.roles = resRol;
              //console.log(resRol);
              console.log(this.roles)
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );


          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu rol ha sido eliminado.",
            icon: "success"
          });
        }
      });

    }
    else {
      Swal.fire({
        title: "Are you sure you want to delete this rol?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.rolesService.eliminarRol(id_rol).subscribe((resRol: any) => {
            console.log("resRol: ", resRol);
            this.rolesService.list().subscribe((resRol: any) => {
              this.roles = resRol;
              //console.log(resRol);
              console.log(this.roles)
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );


          Swal.fire({
            title: "Deleted!",
            text: "Your rol has been deleted.",
            icon: "success"
        });
        }
      });

    }
  }
}
