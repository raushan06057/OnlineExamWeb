import { Route } from '@angular/router';

export const StuExamResultRoute: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./stu-exam-result.component').then(
        (mod) => mod.StuExamResultComponent,
      ),
    children: [
      {
        path: '',
      },
    ],
  },
];
