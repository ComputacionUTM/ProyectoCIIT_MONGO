import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoCIIT';
  aux !: any;
  constructor(private router: Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let ruta = this.router.url;
        if (ruta=='/login' || ruta=='/olvideContrasena') {
          this.aux = false;
        }
        else {
          if (ruta.indexOf("/reestablecerContrasena")==0)
            this.aux = false;
          else
            this.aux = true;
        }
      }
    })
  }
}
