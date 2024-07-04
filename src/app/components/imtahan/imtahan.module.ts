import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImtahanComponent } from './imtahan.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ImtahanComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ImtahanComponent }
    ])
  ]
})
export class ImtahanModule { }
