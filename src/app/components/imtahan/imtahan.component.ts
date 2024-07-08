import { Component, OnInit } from '@angular/core';
import { ImtahanService } from '../../services/model/imtahan/imtahan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imtahan } from '../../models/imtahan';
import { Ders } from '../../models/ders';
import { DersService } from '../../services/model/ders/ders.service';
import { Shagird } from '../../models/shagird';
import { ShagirdService } from '../../services/model/shagird/shagird.service';
import { ToastService } from '../../services/common/toast.service';
import { SpinnerService } from '../../services/common/spinner.service';

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
      qiymet: [imtahan.grade || "", [Validators.required, Validators.max(9), Validators.min(0)]],
      id:[imtahan.id || ""]
    });
  }

  constructor(private shagirdService: ShagirdService, private dersService: DersService,
     private imtahanService: ImtahanService, private formBuilder: FormBuilder,
     private toastService: ToastService,private spinnerService : SpinnerService) {
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

    this.spinnerService.showSpinner(true);

    this.imtahanService.getAll().subscribe({
      next: rs => {
        this.mainData = rs;
        this.spinnerService.showSpinner(false);
      },
      error(err) {
        console.log(err);
        this.spinnerService.showSpinner(false);
      },
    });
  }

  getDersKod() {
    this.spinnerService.showSpinner(true);
    this.dersService.getAll().subscribe(rs => {
      this.dersKodData = rs;
      this.spinnerService.showSpinner(false);
    });
  }

  getShagirdNomre() {
    this.spinnerService.showSpinner(true);
    this.shagirdService.getAll().subscribe(rs => {
      this.shagirdNomreData = rs;
      this.spinnerService.showSpinner(false);
    });
  }

  CreateUpdate() {
    if (this.frm.valid) {
      const imtahan = new Imtahan();

      imtahan.studentId = this.shagirdid.value;
      imtahan.date = this.tarix.value;
      imtahan.grade = parseInt(this.qiymet.value);
      imtahan.lessonId = this.dersid.value;

      this.spinnerService.showSpinner(true);

      if (this.crudStatus) {

        imtahan.id = this.id.value;

        this.imtahanService.update(imtahan).subscribe({
          next: data => {
            this.getAll();
            this.frm.reset();
            this.crudPopupVisible = false;
            this.toastService.showToast(true);
            this.spinnerService.showSpinner(false);
          },
          error: error => {
            console.log(error);

            this.toastService.showToast(false);
            this.spinnerService.showSpinner(false);
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
            this.spinnerService.showSpinner(false);
          },
          error: error => {
            console.log(error);
            this.toastService.showToast(false);
            this.spinnerService.showSpinner(false);
          },
        });


      }
    }
  }

  DeleteItem(id: string) {
    this.spinnerService.showSpinner(true);

    this.imtahanService.deleteItem(id).subscribe({
      next: result => {
        console.log(result);
        this.getAll();
        this.toastService.showToast(true);
        this.spinnerService.showSpinner(false);
      },
      error: error => {
        console.log(error);
        this.toastService.showToast(false);
        this.spinnerService.showSpinner(false);
      },
    });
  }

  //#endregion
}
