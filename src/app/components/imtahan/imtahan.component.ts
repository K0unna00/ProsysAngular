import { Component, OnInit } from '@angular/core';
import { ImtahanService } from '../../services/model/imtahan/imtahan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imtahan } from '../../models/imtahan';
import { Ders } from '../../models/ders';
import { DersService } from '../../services/model/ders/ders.service';
import { Shagird } from '../../models/shagird';
import { ShagirdService } from '../../services/model/shagird/shagird.service';
import { ToastService } from '../../services/common/toast.service';

@Component({
  selector: 'app-imtahan',
  templateUrl: './imtahan.component.html',
  styleUrl: './imtahan.component.scss'
})
export class ImtahanComponent implements OnInit {
  frm: FormGroup;

  initializeForm(imtahan: any = {} ,tarix: any = {}) {
    this.frm = this.formBuilder.group({
      dersid: [imtahan.lessonId || "", Validators.required],
      shagirdid: [imtahan.studentId || "", Validators.required],
      tarix: [tarix || "", Validators.required],
      qiymet: [imtahan.grade || "", [Validators.required, Validators.max(9), Validators.min(0)]]
    });
  }

  constructor(private shagirdService: ShagirdService, private dersService: DersService,
     private imtahanService: ImtahanService, private formBuilder: FormBuilder,
     private toastService: ToastService) {
    this.initializeForm();
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

  get id() {
    return this.frm.get('id')
  }

  //#endregion

  //#region Data

  public mainData: Imtahan[];

  public dersKodData: Ders[];

  public shagirdNomreData: Shagird[];

  public crudPopupVisible: boolean = false;

  listCount: number = 0;

  public crudStatus: boolean;

  //#endregion

  //#region EventHandlers

  ngOnInit(): void {
    this.getAll();
    this.getDersKod();
    this.getShagirdNomre();
  }

  UpdatePopupOpen(imtahan: Imtahan) {

    const formattedDate = imtahan.date ? new Date(imtahan.date).toISOString().split('T')[0] : '';

    this.initializeForm(imtahan,formattedDate);

    this.crudStatus = true;

    this.crudPopupVisible = true;
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

  getAll() {
    this.imtahanService.getAll().subscribe({
      next: rs => {
        this.mainData = rs;
      },
      error(err) {
        console.log(err);

      },
    });
  }

  getDersKod() {
    this.dersService.getAll().subscribe(rs => {
      this.dersKodData = rs;
    });
  }

  getShagirdNomre() {
    this.shagirdService.getAll().subscribe(rs => {
      this.shagirdNomreData = rs;
    });
  }

  CreateUpdate() {
    if (this.frm.valid) {
      const imtahan = new Imtahan();

      imtahan.studentId = this.shagirdid.value;
      imtahan.date = this.tarix.value;
      imtahan.grade = parseInt(this.qiymet.value);
      imtahan.lessonId = this.dersid.value;

      if (this.crudStatus) {

        imtahan.id = this.id.value;

        this.imtahanService.update(imtahan).subscribe({
          next: data => {
            this.getAll();

            this.frm.reset();

            this.crudPopupVisible = false;

            this.toastService.showToast(true);
          },
          error(err) {
            console.log(err);

            this.toastService.showToast(false);
          },
        });

      }
      else {
        this.imtahanService.create(imtahan).subscribe({
          next: data => {
            this.getAll();

            this.frm.reset();

            this.crudPopupVisible = false;

            this.toastService.showToast(true);
          },
          error(err) {
            console.log(err);

            this.toastService.showToast(false);
          },
        });


      }
    }
  }

  DeleteItem(id: string) {
    this.imtahanService.deleteItem(id).subscribe({
      next: result => {
        console.log(result);
        this.getAll();

        this.toastService.showToast(true);
      },
      error(err) {
        console.log(err);

        this.toastService.showToast(false);
      },
    });
  }

  //#endregion
}
