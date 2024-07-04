import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShagirdComponent } from './shagird.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShagirdComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ShagirdComponent }
    ])
  ]
})
export class ShagirdModule { }
