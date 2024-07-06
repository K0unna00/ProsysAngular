import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Ders } from '../../../models/ders';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DersService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName : string = "Lessons";

  create(ders: Ders){
     this.httpClietService.post({
        controller: this.contollerName,
      }, ders);

      return
    
  }

  getAll(): Observable<Ders[]> {

    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  deleteItem(id : string){
    return this.httpClietService.delete({
      controller: this.contollerName
    },id);
  }

}
