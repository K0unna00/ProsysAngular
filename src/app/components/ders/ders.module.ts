import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersComponent } from './ders.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [
    DersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule,
    RouterModule.forChild([
      { path: "", component: DersComponent }
    ])
  ]
})
export class DersModule { }
