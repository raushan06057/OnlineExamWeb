import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { HeaderPage } from './header/header.component';
import { LeftsidebarPage } from './leftsidebar/leftsidebar.component';
import { FooterPage } from './footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, HeaderPage, LeftsidebarPage, FooterPage]
  // declarations: [DashboardPage, LeftsidebarPage, FooterPage]
})
export class DashboardPageModule { }
