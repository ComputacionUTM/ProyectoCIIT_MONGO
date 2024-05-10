import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CambioIdiomaService {
  private messageSource = new BehaviorSubject<string>("");
  currentMsg$ = this.messageSource.asObservable();
  constructor() { }
  sendMsg(idioma:any)
  {
  this.messageSource.next(idioma);
  }
  changeMsg(msg: any)
  {
  this.messageSource.next(msg);
  }
}
