import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user-management/user-management.module').then(mod => mod.UserManagementPageModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./role-management/role-management.module').then(mod => mod.RoleManagementPageModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.module').then(mod => mod.ResetPasswordModule)
      },
      {
        path: 'org-mgmt',
        loadComponent: () => import('./org-management/org-management.component').then(mod => mod.OrgManagement)
      },
      {
        path: 'create-org-mgmt',
        loadComponent: () => import('./org-management/create-org/create-org.component').then(mod => mod.CreateOrgComponent)
      },
      {
        path: 'edit-org-mgmt/:id',
        loadComponent: () => import('./org-management/edit-org/edit-org.component').then(mod => mod.EditOrgComponent)
      },
      {
        path: 'org-dept',
        loadComponent: () => import('./org-management/org-dept/org-dept.component').then(mod => mod.OrgDeptComponent)
      },
      {
        path: 'create-org-dept',
        loadComponent: () => import('./org-management/org-dept/create-org-dept/create-org-dept.component').then(mod => mod.CreateOrgDeptComponent)
      },
      {
        path: 'edit-org-dept/:id',
        loadComponent: () => import('./org-management/org-dept/edit-org-dept/edit-org-dept.component').then(mod => mod.EditOrgDeptComponent)
      },
      {
        path: 'course',
        loadComponent: () => import('./org-management/course-mgmt/course-mgmt.component').then(mod => mod.CourseMgmtComponent)
      },
      {
        path: 'create-course',
        loadComponent: () => import('./org-management/course-mgmt/create-course/create-course.component').then(mod => mod.CreateCourseComponent)
      },
      {
        path: 'edit-course/:id',
        loadComponent: () => import('./org-management/course-mgmt/edit-course/edit-course.component').then(mod => mod.EditCourseComponent)
      },
       {
        path: 'subject',
        loadComponent: () => import('./org-management/subject-mgmt/subject-mgmt.component').then(mod => mod.SubjectMgmtComponent)
      },
      {
        path: 'create-subject',
        loadComponent: () => import('./org-management/subject-mgmt/create-subject/create-subject.component').then(mod => mod.CreateSubjectComponent)
      },
      {
        path: 'edit-subject/:id',
        loadComponent: () => import('./org-management/subject-mgmt/edit-subject/edit-subject.component').then(mod => mod.EditSubjectComponent)
      },
      {
        path: 'guardian',
        loadComponent: () => import('./org-management/guardian/guardian.component').then(mod => mod.GuardianComponent)
      },
      {
        path: 'create-guardian',
        loadComponent: () => import('./org-management/guardian/create-guardian/create-guardian.component').then(mod => mod.CreateGuardianComponent)
      },
      {
        path: 'edit-guardian/:id',
        loadComponent: () => import('./org-management/guardian/edit-guardian/edit-guardian.component').then(mod => mod.EditGuardianComponent)
      },
      {
        path: 'student',
        loadComponent: () => import('./org-management/student-mgmt/student-mgmt.component').then(mod => mod.StudentMgmtComponent)
      },
      {
        path: 'create-student',
        loadComponent: () => import('./org-management/student-mgmt/create-student/create-student.component').then(mod => mod.CreateStudentComponent)
      },
      {
        path: 'edit-student/:id',
        loadComponent: () => import('./org-management/student-mgmt/edit-student/edit-student.component').then(mod => mod.EditStudentComponent)
      },
      {
        path: 'exam',
        loadComponent: () => import('./org-management/exam-mgmt/exam-mgmt.component').then(mod => mod.ExamMgmtComponent)
      },
      {
        path: 'create-exam',
        loadComponent: () => import('./org-management/exam-mgmt/create-exam/create-exam.component').then(mod => mod.CreateExamComponent)
      },
      {
        path: 'edit-exam/:id',
        loadComponent: () => import('./org-management/exam-mgmt/edit-exam/edit-exam.component').then(mod => mod.EditExamComponent)
      },
      {
        path: 'course-enrollment',
        loadComponent: () => import('./org-management/course-enrollment/course-enrollment.component').then(mod => mod.CourseEnrollmentComponent)
      },
      {
        path: 'create-course-enrollment',
        loadComponent: () => import('./org-management/course-enrollment/create-course-enrollment/create-course-enrollment.component').then(mod => mod.CreateCourseEnrollmentComponent)
      },
      {
        path: 'edit-course-enrollment/:id',
        loadComponent: () => import('./org-management/course-enrollment/edit-course-enrollment/edit-course-enrollment.component').then(mod => mod.EditCourseEnrollment)
      },
      {
        path: 'question',
        loadComponent: () => import('./org-management/question-mgmt/question-mgmt.component').then(mod => mod.QuestionMgmtComponent)
      },
      {
        path: 'create-question',
        loadComponent: () => import('./org-management/question-mgmt/create-question/create-question.component').then(mod => mod.CreateQuestionComponent)
      },
      {
        path: 'edit-question/:id',
        loadComponent: () => import('./org-management/question-mgmt/edit-question/edit-question.component').then(mod => mod.EditQuestionComponent)
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule { }