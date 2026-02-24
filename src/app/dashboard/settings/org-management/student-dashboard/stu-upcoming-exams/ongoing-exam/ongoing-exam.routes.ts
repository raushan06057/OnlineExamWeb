import { Route } from '@angular/router';

export const ongoingExamRoute: Route[] = [
    {path:'',loadComponent:()=>import('./ongoing-exam.component').then(mod=>mod.OnGoingExamComponent),
        children:[
            {
                path:''
            }
        ]
    }
];
