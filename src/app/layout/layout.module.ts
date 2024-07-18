import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    SpinnerComponent
  ]
})
export class LayoutModule { }
