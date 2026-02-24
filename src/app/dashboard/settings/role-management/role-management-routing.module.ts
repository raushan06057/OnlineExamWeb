import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagementPage } from './role-management.page';

const routes: Routes = [
  {
    path: '',
    component: RoleManagementPage,
    children: [
      {
        path: 'create-role',
        loadChildren: () => import('./create-role/create-role.module').then(mod => mod.CreateRolePageModule)
      },
      {
        path: 'edit-role/:id',
        loadChildren: () => import('./edit-role/edit-role.module').then(mod => mod.EditRolePageModule)
      },
      {
        path: 'role-list',
        loadChildren: () => import('./role-list/role-list.module').then(mod => mod.RoleListPageModule)
      },
      {
        path: '',
        redirectTo: 'role-list',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementPageRoutingModule { }
