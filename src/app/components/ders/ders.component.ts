import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { DersService } from '../../services/model/ders/ders.service';
import { Ders } from '../../models/ders';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrl: './ders.component.scss'
})
export class DersComponent implements OnInit { 
  
  constructor(private dersService : DersService) {

  }

  public crudPopupVisible : boolean = false;

  ngOnInit(): void {
    
  }

  create(muellimsoyad : HTMLInputElement,muellimad: HTMLInputElement,
    sinif: HTMLInputElement,derskod: HTMLInputElement,dersad: HTMLInputElement){

      const ders = new Ders();

      ders.name = dersad.value,
      ders.code = derskod.value,
      ders.class = sinif.value,
      ders.TeacherSurname = muellimsoyad.value,
      ders.TeacherName = muellimad.value,


      this.dersService.create(ders)

  }

}
