import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Ders } from '../../../models/ders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DersService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName: string = "Lessons";

  create(ders: Ders): Observable<number> {
    return this.httpClietService.post<Ders>({
      controller: this.contollerName,
    }, ders)
  }

  getAll(): Observable<Ders[]> {
    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  deleteItem(id: string) : Observable<boolean>{
    return this.httpClietService.delete({
      controller: this.contollerName
    }, id);
  }

}
