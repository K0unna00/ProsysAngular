import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersComponent } from './ders.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: DersComponent }
    ])
  ]
})
export class DersModule { }
