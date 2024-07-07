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

  create(ders: Ders): Observable<Ders> {
    return this.httpClietService.post<Ders>({
      controller: this.contollerName,
    }, ders)
  }

  getAll(): Observable<Ders[]> {
    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  update(imtahan: Ders) : Observable<Ders>{
    return this.httpClietService.put({
      controller: this.contollerName
    }, imtahan)
  }

  deleteItem(id: string) : Observable<boolean>{
    return this.httpClietService.delete({
      controller: this.contollerName
    }, id);
  }

}
