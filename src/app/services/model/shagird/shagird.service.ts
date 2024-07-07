import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Shagird } from '../../../models/shagird';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShagirdService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName: string = "Students";

  create(shagird: Shagird): Observable<Shagird> {
    return this.httpClietService.post<Shagird>({
      controller: this.contollerName,
    }, shagird)
  }

  getAll(): Observable<Shagird[]> {
    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  deleteItem(id: string) : Observable<boolean>{
    return this.httpClietService.delete({
      controller: this.contollerName
    }, id);
  }

  update(shagird: Shagird) : Observable<Shagird>{
    return this.httpClietService.put({
      controller: this.contollerName
    }, shagird)
  }

}
