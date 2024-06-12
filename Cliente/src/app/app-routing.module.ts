import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReestablecerContrasenaComponent } from './components/reestablecer-contrasena/reestablecer-contrasena.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { OfertaLaboralComponent } from './components/oferta-laboral/oferta-laboral.component';
import { RolesComponent } from './components/roles/roles.component';
import { PerfilComponent } from './components/perfil/perfil.component';
PerfilComponent
const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'principal',
    component: PrincipalComponent
  },
  {
    path: 'olvideContrasena',
    component: OlvideContrasenaComponent
  },
  {
    path: 'reestablecerContrasena/:token',
    component: ReestablecerContrasenaComponent
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
      {
        path: 'usuarios',
        component: UsuarioComponent,
      },
      {
        path: 'empresa',
        component: EmpresaComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'ofertaLaboral',
        component: OfertaLaboralComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
