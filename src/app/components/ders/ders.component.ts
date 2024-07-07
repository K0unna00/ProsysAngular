import { Component, OnInit } from '@angular/core';
import { DersService } from '../../services/model/ders/ders.service';
import { Ders } from '../../models/ders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrl: './ders.component.scss'
})
export class DersComponent implements OnInit {
  frm: FormGroup;

  constructor(private dersService: DersService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      dersad: ["", [Validators.required, Validators.maxLength(30)]],
      derskod: ["", [Validators.required, Validators.max(999)]],
      sinif: ["", [Validators.required, Validators.max(99)]],
      muellimad: ["", [Validators.required, Validators.maxLength(20)]],
      muellimsoyad: ["", [Validators.required, Validators.maxLength(20)]],

    });
  }

  //#region FormItems

  get dersad() {
    return this.frm.get('dersad')
  }

  get derskod() {
    return this.frm.get('derskod')
  }

  get sinif() {
    return this.frm.get('sinif')
  }

  get muellimad() {
    return this.frm.get('muellimad')
  }

  get muellimsoyad() {
    return this.frm.get('muellimsoyad')
  }

  get id() {
    return this.frm.get('id')
  }


  //#endregion

  //#region Data
  public mainData: Ders[];

  public crudPopupVisible: boolean = false;

  public crudStatus : boolean;

  listCount: number = 0;

  //#endregion

  //#region EventHandlers

  ngOnInit(): void {
    this.getAll();
  }

  CrudPopupOpen(): void {
    this.frm.reset();
    this.crudPopupVisible = true;
  }

  CrudPopupClose(): void {
    this.frm.reset();
    this.crudPopupVisible = false;
  }

  UpdatePopupOpen(ders: Ders) {
    this.frm = this.formBuilder.group({
      dersad: [ders.name],
      derskod: [ders.code],
      sinif: [ders.class],
      muellimad: [ders.teacherName],
      muellimsoyad: [ders.teacherSurname],
      id: [ders.id]
    });

    this.crudStatus = true;

    this.crudPopupVisible = true;
  }

  getAll() {
    this.dersService.getAll().subscribe(rs => {
      this.mainData = rs;
    });
  }

  CreateUpdate() {
    if (this.frm.valid) {
      const ders = new Ders();

      ders.name = this.dersad.value;
      ders.code = this.derskod.value;
      ders.class = parseInt(this.sinif.value);
      ders.teacherSurname = this.muellimsoyad.value;
      ders.teacherName = this.muellimad.value;

      if(this.crudStatus){
        ders.id = this.id.value;

        this.dersService.update(ders).subscribe({
          next: data => {
            this.getAll();
  
            this.frm.reset();
  
            this.crudPopupVisible = false;
          },
          error(err) {
            console.log(err);
            alert("Error!! Status code: " + err.status)
          },
        });;
      }
      else{
        this.dersService.create(ders).subscribe({
          next: data => {
            this.getAll();
  
            this.frm.reset();
  
            this.crudPopupVisible = false;
          },
          error(err) {
            console.log(err);
            alert("Error!! Status code: " + err.status)
          },
        });;
      }

     

      
    }
  }

  DeleteItem(id: string) {
    this.dersService.deleteItem(id).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  //#endregion
}
