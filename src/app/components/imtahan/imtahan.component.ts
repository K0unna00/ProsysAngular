import { Component, OnInit } from '@angular/core';
import { ImtahanService } from '../../services/model/imtahan/imtahan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imtahan } from '../../models/imtahan';
import { Ders } from '../../models/ders';
import { DersService } from '../../services/model/ders/ders.service';
import { Shagird } from '../../models/shagird';
import { ShagirdService } from '../../services/model/shagird/shagird.service';

@Component({
  selector: 'app-imtahan',
  templateUrl: './imtahan.component.html',
  styleUrl: './imtahan.component.scss'
})
export class ImtahanComponent implements OnInit {
  frm: FormGroup;
  constructor(private shagirdService : ShagirdService ,private dersService : DersService,private imtahanService: ImtahanService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      dersid: ["", Validators.required],
      shagirdid: ["", Validators.required ],
      tarix: ["", Validators.required],
      qiymet: ["", [Validators.required, Validators.max(9),Validators.min(0)]]

    });
  }


  //#region FormItems

  get dersid() {
    return this.frm.get('dersid')
  }

  get shagirdid() {
    return this.frm.get('shagirdid')
  }

  get tarix() {
    return this.frm.get('tarix')
  }

  get qiymet() {
    return this.frm.get('qiymet')
  }

  //#endregion

  //#region Data

  public mainData: Imtahan[];

  public dersKodData: Ders[];
  
  public shagirdNomreData: Shagird[];

  public crudPopupVisible: boolean = false;

  listCount: number = 0;


  //#endregion

  //#region EventHandlers

  ngOnInit(): void {
    this.getAll();
    this.getDersKod();
    this.getShagirdNomre();
  }

  CrudPopupVisibleChange(val: boolean): void {

    this.frm.reset();

    this.crudPopupVisible = val;
  }

  getAll() {
    this.imtahanService.getAll().subscribe({
      next : rs => {
        this.mainData = rs;
      },
      error(err) {
        console.log(err);
        
      },
    });
  }

  getDersKod(){
    this.dersService.getAll().subscribe(rs => {
      this.dersKodData = rs;
    });
  }

  getShagirdNomre(){
    this.shagirdService.getAll().subscribe(rs => {
      this.shagirdNomreData = rs;
    });
  }

  create() {
    if (this.frm.valid) {
      const imtahan = new Imtahan();

      imtahan.studentId = this.shagirdid.value,
      imtahan.date = this.tarix.value,
      imtahan.grade = parseInt(this.qiymet.value),
      imtahan.lessonId = this.dersid.value

      this.imtahanService.create(imtahan).subscribe({
        next: data => {
          console.log(data);
          this.getAll();
        },
        error(err) {
          console.log(err);
        },
      });;
      this.crudPopupVisible = false;
    }
  }

  deleteItem(id: string) {
    this.imtahanService.deleteItem(id).subscribe({
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
