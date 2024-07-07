import { Component, OnInit } from '@angular/core';
import { ShagirdService } from '../../services/model/shagird/shagird.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shagird } from '../../models/shagird';

@Component({
  selector: 'app-shagird',
  templateUrl: './shagird.component.html',
  styleUrl: './shagird.component.scss'
})
export class ShagirdComponent implements OnInit {
  frm: FormGroup;

  initializeForm(shagird: any = {}) {
    this.frm = this.formBuilder.group({
      ad: [shagird.name || "", [Validators.required, Validators.maxLength(30)]],
      soyad: [shagird.surname || "", [Validators.required, Validators.maxLength(30)]],
      sinif: [shagird.class || "", [Validators.required, Validators.max(99)]],
      nomre: [shagird.number || "", [Validators.required, Validators.max(99999)]]
    });
  }


  constructor(private shagirdService: ShagirdService, private formBuilder: FormBuilder) {
    this.initializeForm();
  }


  //#region FormItems

  get ad() {
    return this.frm.get('ad')
  }

  get soyad() {
    return this.frm.get('soyad')
  }

  get sinif() {
    return this.frm.get('sinif')
  }

  get nomre() {
    return this.frm.get('nomre')
  }

  get id() {
    return this.frm.get('id')
  }

  //#endregion

  //#region Data

  public mainData: Shagird[];

  public crudPopupVisible: boolean = false;

  /**
   * insertMode = false;
   * updateMode = true;
   */
  crudStatus: boolean;

  listCount: number = 0;

  //#endregion

  //#region EventHandlers
  ngOnInit(): void {
    this.getAll();
  }

  CrudPopupOpen(): void {
    this.frm.reset();
    this.crudPopupVisible = true;
    this.crudStatus = false;
  }

  CrudPopupClose(): void {
    this.frm.reset();
    this.crudPopupVisible = false;
  }

  UpdatePopupOpen(shagird: Shagird) {
    this.initializeForm(shagird);

    this.crudStatus = true;

    this.crudPopupVisible = true;
  }

  getAll() {
    this.shagirdService.getAll().subscribe(rs => {
      this.mainData = rs;
    });
  }

  CreateUpdate() {
    if (this.frm.valid) {

      
      const shagird = new Shagird();
      
      shagird.name = this.ad.value;
      shagird.surname = this.soyad.value;
      shagird.class = this.sinif.value;
      shagird.number = this.nomre.value;

      if (this.crudStatus) {

        shagird.id = this.id.value;

        this.shagirdService.update(shagird).subscribe({
          next: data => {
            this.getAll();
            this.frm.reset();
            this.crudPopupVisible = false;
          },
          error(err) {
            console.log(err);
            alert("Error!! Status code: " + err.status)
          },
        });
        
      }
      else {
        this.shagirdService.create(shagird).subscribe({
          next: data => {
            this.getAll();
            this.frm.reset();
            this.crudPopupVisible = false;
          },
          error(err) {
            console.log(err);
            alert("Error!! Status code: " + err.status)
          },
        });
      }

      
    }
  }

  DeleteItem(id: string) {
    this.shagirdService.deleteItem(id).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  updateItem(shagird: Shagird) {
    this.shagirdService.update(shagird).subscribe({
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
