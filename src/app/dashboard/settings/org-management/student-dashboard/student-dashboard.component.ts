import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { StuHeaderComponent } from "./stu-header/stu-header.component";
import { RouterModule } from "@angular/router";
import { StuLeftMenuComponent } from "./stu-left-menu/stu-left-menu.component";
// import { StudentDashboardRoutingModule } from "./student-dashboard-routing.module";
import { StuFooterComponent } from "./stu-footer/stu-footer.component";

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.scss'],
    imports:[CommonModule,ReactiveFormsModule,RouterModule,StuHeaderComponent, StuLeftMenuComponent, StuFooterComponent],
    standalone:true
})//StudentDashboardRoutingModule
export class StudentDashboardComponent implements OnInit {
    constructor(){
    }
    ngOnInit(): void {

    }

}