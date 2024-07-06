import { Component, OnInit } from '@angular/core';
import { ShagirdService} from '../../services/model/shagird/shagird.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shagird } from '../../models/shagird';

@Component({
  selector: 'app-shagird',
  templateUrl: './shagird.component.html',
  styleUrl: './shagird.component.scss'
})
export class ShagirdComponent implements OnInit {
  frm: FormGroup;

  constructor(private shagirdService: ShagirdService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      ad: ["", [Validators.required, Validators.maxLength(30)]],
      soyad: ["", [Validators.required, Validators.maxLength(30)]],
      sinif: ["", [Validators.required, Validators.max(99)]],
      nomre: ["", [Validators.required, Validators.max(99999)]],
    });
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

  //#endregion

  //#region Data

  public mainData: Shagird[];

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
    this.shagirdService.getAll().subscribe(rs => {
      this.mainData = rs;
    });
  }

  create() {      
    if(this.frm.valid){
      const shagird = new Shagird();
      
      shagird.name = this.ad.value,
      shagird.surname = this.soyad.value,
      shagird.class = this.sinif.value
      shagird.number = this.nomre.value

      this.shagirdService.create(shagird).subscribe({
        next: data =>{
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

  deleteItem(number: number) {
    this.shagirdService.deleteItem(number).subscribe({
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
