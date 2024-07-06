import { Component, OnInit } from '@angular/core';
import { imtahanService } from '../../services/model/imtahan/imtahan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imtahan } from '../../models/imtahan';

@Component({
  selector: 'app-imtahan',
  templateUrl: './imtahan.component.html',
  styleUrl: './imtahan.component.scss'
})
export class ImtahanComponent implements OnInit {
  frm: FormGroup;
  constructor(private imtahanService: imtahanService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      derskod: ["", [Validators.required, Validators.maxLength(3)]],
      shagirdnomresi: ["", [Validators.required, Validators.maxLength(5)]],
      tarix: ["", Validators.required],
      qiymet: ["", [Validators.required, Validators.maxLength(1)]]

    });
  }


  //#region FormItems


  get derskod() {
    return this.frm.get('derskod')
  }

  get shagirdnomresi() {
    return this.frm.get('shagirdnomresi')
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

  public crudPopupVisible: boolean = false;

  listCount: number = 0;

  //#endregion

  //#region EventHandlers

  ngOnInit(): void {
    this.getAll();
  }

  CrudPopupVisibleChange(val: boolean): void {

    this.frm.reset();

    this.crudPopupVisible = val;
  }

  getAll() {
    this.imtahanService.getAll().subscribe(rs => {
      this.mainData = rs;
    });
  }

  create() {
    if (this.frm.valid) {
      const imtahan = new Imtahan();

      imtahan.studentNumber = this.shagirdnomresi.value,
      imtahan.date = this.tarix.value,
      imtahan.grade = parseInt(this.qiymet.value),
      imtahan.lessoncode = this.derskod.value

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
