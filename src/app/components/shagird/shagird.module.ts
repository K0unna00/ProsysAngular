import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShagirdComponent } from './shagird.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShagirdComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: ShagirdComponent }
    ])
  ]
})
export class ShagirdModule { }
