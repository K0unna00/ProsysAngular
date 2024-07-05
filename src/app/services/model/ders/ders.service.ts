import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Ders } from '../../../models/ders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DersService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName : string = "Lessons";

  create(ders: Ders) : Observable<number> {
    try {


      var obj =  this.httpClietService.post<Ders>({
        controller: this.contollerName,
      }, ders)

      console.log(obj);
      
      return obj;

    }
    catch (ex) {

      console.log(ex);

      return new Observable<0>

    }
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
