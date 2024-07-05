import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Ders } from '../../../models/ders';

@Injectable({
  providedIn: 'root'
})
export class DersService {

  constructor(private httpClietService : HttpClientService) { }

  

  create(ders : Ders){
    this.httpClietService.post<Ders>({
      controller : "Lessons",
    },ders).subscribe(result => {

      
      alert("message");
    });

  }
}
