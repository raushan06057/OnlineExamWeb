import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MainDashboardPage } from './main-dashboard.page';
import { MainDashboardPageRoutingModule } from './main-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainDashboardPageRoutingModule
  ],
  declarations: [MainDashboardPage]
})
export class MainDashboardModule {}
