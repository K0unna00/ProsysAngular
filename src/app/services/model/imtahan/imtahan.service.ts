import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Observable } from 'rxjs';
import { Imtahan } from '../../../models/imtahan';

@Injectable({
  providedIn: 'root'
})
export class imtahanService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName: string = "Lessons";

  create(imtahan: Imtahan): Observable<number> {
    return this.httpClietService.post<Imtahan>({
      controller: this.contollerName,
    }, imtahan)
  }

  getAll(): Observable<Imtahan[]> {
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
