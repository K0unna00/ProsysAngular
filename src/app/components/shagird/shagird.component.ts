import { Component, OnInit } from '@angular/core';
import { ShagirdService } from '../../services/model/shagird/shagird.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shagird } from '../../models/shagird';
import { ToastService } from '../../services/common/toast.service';
import { SpinnerService } from '../../services/common/spinner.service';
import { PaginationResponse } from '../../models/paginationResponse';

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
      nomre: [shagird.number || "", [Validators.required, Validators.max(99999)]],
      id: [shagird.id || ""]
    });
  }

  constructor(private shagirdService: ShagirdService, private formBuilder: FormBuilder,
    private toastService: ToastService, private spinnerService: SpinnerService) {
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

  dataCount: Array<number> = new Array(6);

  currentPage: number = 0;

  currentPageSize: number = 4;

  //#endregion

  //#region EventHandlers
  ngOnInit(): void {
    this.GetAllPagination();
  }

  ChangePage(index: number): void {
    this.currentPage = index;

    this.GetAllPagination();
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

  GetAllPagination() {

    this.spinnerService.showSpinner(true);
    this.shagirdService.getAllPagination(this.currentPage,this.currentPageSize).subscribe((rs: PaginationResponse<Shagird>) => {

      this.dataCount = new Array(Math.ceil(rs.totalCount / this.currentPageSize));

      console.log(Math.ceil(rs.totalCount / this.currentPageSize));


      this.mainData = rs.response;

      console.log(rs);


      this.spinnerService.showSpinner(false);
    });
  }

  CreateUpdate() {
    if (this.frm.valid) {
      const shagird = new Shagird();

      shagird.name = this.ad.value;
      shagird.surname = this.soyad.value;
      shagird.class = this.sinif.value;
      shagird.number = this.nomre.value;

      this.spinnerService.showSpinner(true);

      if (this.crudStatus) {

        shagird.id = this.id.value;

        this.shagirdService.update(shagird).subscribe({
          next: data => {
            this.GetAllPagination();
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
        this.shagirdService.create(shagird).subscribe({
          next: data => {
            if (this.mainData.length == this.currentPageSize)

              this.currentPage++;
    
            this.ChangePage(this.currentPage);

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

    this.shagirdService.deleteItem(id).subscribe({
      next: result => {

        if (this.mainData.length == 1)

          this.currentPage = this.currentPage != 0 ? this.currentPage - 1 : 0;

        this.ChangePage(this.currentPage);

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
