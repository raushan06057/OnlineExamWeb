import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRolePage } from './create-role.page';
import { CreateRolePageRoutingModule } from './create-role-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRolePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRolePage]
})
export class CreateRolePageModule {}
