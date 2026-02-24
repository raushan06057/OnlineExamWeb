import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { StudentDashboardComponent } from "../student-dashboard.component";

@Component({
    selector:'app-stu-main-dashboard',
    templateUrl:'./stu-main-dashboard.component.html',
    styleUrls:['./stu-main-dashboard.component.scss'],
    imports:[CommonModule],
    standalone:true
  
})
export class StuMainDashboardComponent implements OnInit{
    constructor(){
    }
    ngOnInit(): void {
    }

}