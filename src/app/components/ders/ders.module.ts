import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersComponent } from './ders.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: DersComponent }
    ])
  ]
})
export class DersModule { }
