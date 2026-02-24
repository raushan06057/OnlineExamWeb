import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsPageModule)
      },
      {
        path: 'main-dashboard',
        loadChildren: () => import('./main-dashboard/main-dashboard.module').then(mod => mod.MainDashboardModule)
      },
      {
        path:'',
        redirectTo:'main-dashboard',
        pathMatch:'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }