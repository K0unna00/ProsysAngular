import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImtahanComponent } from './imtahan.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImtahanComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: ImtahanComponent }
    ])
  ]
})
export class ImtahanModule { }
