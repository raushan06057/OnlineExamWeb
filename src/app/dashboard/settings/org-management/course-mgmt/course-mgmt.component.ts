import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CourseMgmtService } from "src/app/shared/services/course-mgmt.service";
import { ICourseModel } from "src/app/shared/models/common-models/course.model";
import { Route, Router } from "@angular/router";

@Component({
    selector: 'app-course-mgmt',
    templateUrl: './course-mgmt.component.html',
    styleUrls: ['./course-mgmt.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule]
})
export class CourseMgmtComponent implements OnInit {
    courseModels: ICourseModel[] = [];
    courseForm: FormGroup;
    constructor(private courseMgmtService: CourseMgmtService, private formBuilder: FormBuilder,private route:Router) {
        this.courseForm = this.formBuilder.group({
            title: ['']
        });
    }
    ngOnInit(): void {
        this.get();
    }
    get() {
        this.courseMgmtService.get().subscribe(mod => {
            this.courseModels = mod.data;
        });
    }
    searchCourse() { }
    createCourse() { 
        this.route.navigate(['/dashboard/settings/create-course']);
    }
    editCourse(id:any){
        this.route.navigate(['/dashboard/settings/edit-course/'+id]);
    }
    deleteCourse(id:any,title:any){}
}