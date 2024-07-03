import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DersModule } from './ders/ders.module';
import { ShagirdModule } from './shagird/shagird.module';
import { ImtahanModule } from './imtahan/imtahan.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DersModule,
    ShagirdModule,
    ImtahanModule
  ],
  
})
export class ComponentsModule { }
