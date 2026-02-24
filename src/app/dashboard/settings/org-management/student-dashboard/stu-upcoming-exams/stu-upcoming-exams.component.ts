import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector:'app-stu-upcoming-exams',
    templateUrl:'./stu-upcoming-exams.component.html',
    styleUrls:['./stu-upcoming-exams.component.scss'],
    imports:[CommonModule,RouterModule],
    standalone:true
})
export class StuUpcomingExamsComponent{

}