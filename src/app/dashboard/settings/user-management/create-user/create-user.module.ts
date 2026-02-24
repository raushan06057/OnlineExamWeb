import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserPage } from './create-user.page';
import { CreateUserPageRoutingModule } from './create-user-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    CreateUserPageRoutingModule
  ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule { }
