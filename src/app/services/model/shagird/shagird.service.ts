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

  create(shagird: Shagird): Observable<number> {
    return this.httpClietService.post<Shagird>({
      controller: this.contollerName,
    }, shagird)
  }

  getAll(): Observable<Shagird[]> {
    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  deleteItem(number: number) : Observable<boolean>{
    return this.httpClietService.delete({
      controller: this.contollerName
    }, number);
  }

}
