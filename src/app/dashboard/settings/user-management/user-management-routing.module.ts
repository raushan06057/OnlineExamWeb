import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementPage } from './user-management.page';

const routes: Routes = [
  {
    path: '',
    component: UserManagementPage,
    children: [
      {
        path: 'create-user',
        loadChildren: () => import('./create-user/create-user.module').then(mod => mod.CreateUserPageModule)
      },
      {
        path: 'edit-user/:id',
        loadChildren: () => import('./edit-user/edit-user.module').then(mod => mod.EditUserPageModule)
      },
      {
        path: 'user-list',
        loadChildren: () => import('./user-list/user-list.module').then(mod => mod.UserListPageModule)
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementPageRoutingModule { }
