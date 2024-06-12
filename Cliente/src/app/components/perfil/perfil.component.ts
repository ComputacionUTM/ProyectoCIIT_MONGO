import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario : any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.perfil().subscribe((resusuario: any) => {
      console.log("Probando perfil", resusuario);
      this.usuario = resusuario;
    },
      err => console.error(err)
    );
  }


}
