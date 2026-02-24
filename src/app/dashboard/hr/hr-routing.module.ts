import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HRPage } from './hr.page';

const routes: Routes = [
  {
    path: '',
    component: HRPage,
    // children: [
    //   {
    //     path: 'master',
    //     loadChildren: () => import('./master/master-management.module').then(mod => mod.MasterManagementPageModule)
    //   },
    //   {
    //     path: 'user',
    //     loadChildren: () => import('./user-management/user-management.module').then(mod => mod.UserManagementPageModule)
    //   },
    //   {
    //     path: 'menu',
    //     loadChildren: () => import('./menu-management/menu-management.module').then(mod => mod.MenuManagementModule)
    //   },
    //   {
    //     path: 'role',
    //     loadChildren: () => import('./role-management/role-management.module').then(mod => mod.RoleManagementPageModule)
    //   },
    //   {
    //     path: 'reset-password',
    //     loadChildren: () => import('./reset-password/reset-password.module').then(mod => mod.ResetPasswordModule)
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'user',
    //     pathMatch: 'full'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HRRoutingModule { }