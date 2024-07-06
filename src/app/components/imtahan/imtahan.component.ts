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
      // imtahanad: ["", [Validators.required, Validators.maxLength(30)]],
      // imtahankod: ["", [Validators.required, Validators.maxLength(3)]],
      // sinif: ["", [Validators.required, Validators.maxLength(2)]],
      // muellimad: ["", [Validators.required, Validators.maxLength(20)]],
      // muellimsoyad: ["", [Validators.required, Validators.maxLength(20)]],

    });
  }


  //#region FormItems


  get imtahanad() {
    return this.frm.get('imtahanad')
  }

  get imtahankod() {
    return this.frm.get('imtahankod')
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
  public mainData: Imtahan[];

  public crudPopupVisible: boolean = false;

  listCount : number = 0;

  //#endregion
  

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {

    this.imtahanService.getAll().subscribe(rs => {
      this.mainData = rs;
    });


  }

  create() {      
    if(this.frm.valid){
      const imtahan = new Imtahan();
      
      // imtahan.name = this.imtahanad.value,
      // imtahan.code = this.imtahankod.value,
      // imtahan.class = parseInt(this.sinif.value),
      // imtahan.teacherSurname = this.muellimsoyad.value,
      // imtahan.teacherName = this.muellimad.value,
      
      console.log(imtahan);
      

      this.imtahanService.create(imtahan).subscribe({
        next: data =>{
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
