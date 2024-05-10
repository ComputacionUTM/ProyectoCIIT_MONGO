import { Component, OnInit } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  idioma: any = '1';

  constructor(private cambioIdiomaService: CambioIdiomaService) { 
    this.idioma = localStorage.getItem("idioma");

  }

  ngOnInit(): void {
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem('idioma')
        console.log("idioma actual del footer:", this.idioma, " aaaa");
      });

  }

}
