import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Observable } from 'rxjs';
import { Imtahan } from '../../../models/imtahan';
import { PaginationResponse } from '../../../models/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class ImtahanService {

  constructor(private httpClietService: HttpClientService) { }

  contollerName: string = "Exams";

  create(imtahan: Imtahan): Observable<Imtahan> {
    console.log(imtahan);
    return this.httpClietService.post<Imtahan>({
      controller: this.contollerName,
    }, imtahan)
  }

  getAll(): Observable<Imtahan[]> {
    return this.httpClietService.getAll({
      controller: this.contollerName,
    });
  }

  
  getAllPagination(page : number, size? : number): Observable<PaginationResponse<Imtahan>>{
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

  update(imtahan: Imtahan) : Observable<Imtahan>{
    return this.httpClietService.put({
      controller: this.contollerName
    }, imtahan)
  }

}
