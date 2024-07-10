import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Shagird } from '../../../models/shagird';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../models/paginationResponse';

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

  getAllPagination(page : number, size? : number): Observable<PaginationResponse<Shagird>>{
    return this.httpClietService.getAllPagination({
      controller: this.contollerName,
      action: "get-all-pagination",
      queryString: `?page=${page? page : 0}&size=${size? size : 12}`,
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
