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

  public mainData : Ders[];

  public crudPopupVisible : boolean = false;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){

    this.dersService.getAll().subscribe(rs => {

      console.log(rs);
      
      this.mainData = rs;

    });

    
  }

  create(muellimsoyad : HTMLInputElement,muellimad: HTMLInputElement,
    sinif: HTMLInputElement,derskod: HTMLInputElement,dersad: HTMLInputElement){

      console.log("ComponentLvl Create works");

      const ders = new Ders();

      ders.name = dersad.value,
      ders.code = derskod.value,
      ders.class = parseInt(sinif.value),
      ders.teacherSurname = muellimsoyad.value,
      ders.teacherName = muellimad.value,


      this.dersService.create(ders).subscribe(response => {

        if(response === 201)
          
          this.getAll();
        

      });

      this.crudPopupVisible = false;
  }

  deleteItem(id : string){
    this.dersService.deleteItem(id);

    setTimeout(() => {
      this.getAll();
    }, 300);
  }

}
