import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DersComponent } from './components/ders/ders.component';
import { ImtahanComponent } from './components/imtahan/imtahan.component';
import { ShagirdComponent } from './components/shagird/shagird.component';

const routes: Routes = [
  {path: "ders", component: DersComponent},
  {path: "imtahan", component: ImtahanComponent},
  {path: "shagird", component: ShagirdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
