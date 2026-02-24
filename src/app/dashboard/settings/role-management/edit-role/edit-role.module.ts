import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRolePage } from './edit-role.page';
import { EditRolePageRoutingModule } from './edit-role-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRolePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditRolePage]
})
export class EditRolePageModule {}
