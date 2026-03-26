import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './dashboard/settings/org-management/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'student-dashboard',
    //component: StudentDashboardComponent,
    loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/student-dashboard.component')
      .then(mod => mod.StudentDashboardComponent),
    children: [
      {
        path: 'upcoming-exam',
        loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/stu-upcoming-exams.component')
          .then(mod => mod.StuUpcomingExamsComponent),
        children: [
          {
            path: 'exam-schedule',
            loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/exam-schedule/exam-schedule.component')
              .then(mod => mod.ExamScheduleComponent)
            // children:[
            //   {
            //     path:'ExamScheduleComponent',
            //     loadComponent:()=>import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/exam-schedule/')
            //   }
            // ]
          },
          {
            path: '',
            redirectTo: 'exam-schedule',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'exam-progress-tracking',
        loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/exam-progress-tracking/exam-progress-tracking.component')
          .then(mod => mod.ExamProgressTrackingComponent)
      },
       {
        path: 'stu-exam-result-hist',
        loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-exam-result-history/stu-exam-result-history.component')
          .then(mod => mod.StuExamResultHistoryComponent)
      },

      {
        path: 'stu-account-settings',
        loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-account-settings/stu-account-settings.component')
          .then(mod => mod.StuAccountSettingsComponent)
      },
      {
        path: '',
        loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-main-dashboard/stu-main-dashboard.component')
          .then(mod => mod.StuMainDashboardComponent)
      }
    ]
    // loadChildren: () => import('./dashboard/settings/org-management/student-dashboard/student-dashboard.module').then(mod => mod.StudentDashboardModule)
    // loadComponent:()=>import('./dashboard/settings/org-management/student-dashboard/student-dashboard.component')
    // .then(mod=>mod.StudentDashboardComponent)
  },
  {
    path: 'ongoing-exam/:id',
    loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/ongoing-exam/ongoing-exam.component')
      .then(mod => mod.OnGoingExamComponent)
      // children:[
      //   {
      //     path:'questions-ongoing-exam',
      //     loadChildren:()=>import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/ongoing-exam/question-ongoing-exam/question-ongoing-exam.component')
      //     .then(mod=>mod.QuestionOnGoingExamComponent)
      //   },
      //    {
      //       path: '',
      //       redirectTo: 'questions-ongoing-exam',
      //       pathMatch: 'full'
      //     }
      // ]
  },
   {
    path: 'ongoing-exam-result/:id',
    loadComponent: () => import('./dashboard/settings/org-management/student-dashboard/stu-upcoming-exams/stu-exam-result/stu-exam-result.component')
      .then(mod => mod.StuExamResultComponent)
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
