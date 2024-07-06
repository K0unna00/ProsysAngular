import { Component, OnInit } from '@angular/core';
import { DersService } from '../../services/model/ders/ders.service';
import { Ders } from '../../models/ders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

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
      derskod: ["", [Validators.required, Validators.maxLength(3)]],
      sinif: ["", [Validators.required, Validators.maxLength(2)]],
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

  //#endregion

  //#region Data
  public mainData: Ders[];

  public crudPopupVisible: boolean = false;

  listCount : number = 0;

  //#endregion
  

  ngOnInit(): void {
    this.getAll();
  }

  CrudPopupVisibleChange(val : boolean): void{

    this.frm.reset();

    this.crudPopupVisible = val;
  }

  getAll() {

    this.dersService.getAll().subscribe(rs => {
      this.mainData = rs;
    });


  }

  create() {      
    if(this.frm.valid){
      const ders = new Ders();
      
      ders.name = this.dersad.value,
      ders.code = this.derskod.value,
      ders.class = parseInt(this.sinif.value),
      ders.teacherSurname = this.muellimsoyad.value,
      ders.teacherName = this.muellimad.value,

      this.dersService.create(ders).subscribe({
        next: data =>{
          console.log(data);

          this.getAll();

          this.frm.reset();

          this.crudPopupVisible = false;
        },
        error(err) {

          // this.frm.reset();

          console.log(err);
          alert("Error!! Status code: " + err.status)
        },
      });;
      
      

    }

  }

  deleteItem(id: string) {
    this.dersService.deleteItem(id).subscribe({
      next: result =>{
        console.log(result);

        this.getAll();
      },
      error(err) {
        console.log(err); 
      },

    });
  }

}
