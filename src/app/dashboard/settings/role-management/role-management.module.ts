import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RoleManagementPage } from './role-management.page';
import { RoleManagementPageRoutingModule } from './role-management-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleManagementPageRoutingModule
  ],
  declarations: [RoleManagementPage]
})
export class RoleManagementPageModule {}
