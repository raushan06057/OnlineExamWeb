import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserManagementPage } from './user-management.page';
import { UserManagementPageRoutingModule } from './user-management-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserManagementPageRoutingModule
  ],
  declarations: [UserManagementPage]
})
export class UserManagementPageModule {}
