import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ICourseEnrollmentModel } from "src/app/shared/models/common-models/course-enrollment.model";
import { Router } from "@angular/router";
import { CourseEnrollmentService } from "src/app/shared/services/course-enrollment.service";

@Component({
    selector: 'app-course-enrollment',
    templateUrl: './course-enrollment.component.html',
    styleUrls: ['./course-enrollment.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule]
})
export class CourseEnrollmentComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private courseEnrollmentService: CourseEnrollmentService) { }
    courseEnrollmentForm: FormGroup = this.formBuilder.group({
        studentId: ['']
    })
    enrollmentModels: ICourseEnrollmentModel[] = [];
    ngOnInit(): void {
        this.get();
    }
    get() {
        this.courseEnrollmentService.get().subscribe(mod => {
            debugger;
            this.enrollmentModels = mod.data;
        });
    }
    searchEnrollment() { }
    createEnrollment() {
        this.router.navigate(['/dashboard/settings/create-course-enrollment']);
    }
    editEnrollment(id: any) {
        this.router.navigate(['/dashboard/settings/edit-course-enrollment/' + id]);
    }
    deleteEnrollment(id: any) { }
}