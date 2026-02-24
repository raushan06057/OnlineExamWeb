import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleListPage } from './role-list.page';
import { RoleListPageRoutingModule } from './role-list-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    RoleListPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [RoleListPage]
})
export class RoleListPageModule {}
