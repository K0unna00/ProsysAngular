import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersModule } from './ders/ders.module';
import { ShagirdModule } from './shagird/shagird.module';
import { ImtahanModule } from './imtahan/imtahan.module';
import { ToastModule } from './toast/toast.module';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    DersModule,
    ShagirdModule,
    ImtahanModule,
    ToastModule
  ],
  exports:[
    ToastComponent
  ]
})
export class ComponentsModule { }
