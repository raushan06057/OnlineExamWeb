import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { Route, Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { CourseMgmtService } from "src/app/shared/services/course-mgmt.service";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
  standalone: true
})
export class CreateCourseComponent implements OnInit {
  orgs: IOrgModel[] = [];
  constructor(private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService, private router: Router, private toastService: ToastService,
    private courseMgmtService: CourseMgmtService
  ) { }
  ngOnInit(): void {
    this.getOrgs();
  }
  createCourseForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    credits: ['', [Validators.required]],
    organizationId: ['', [Validators.required]]
  });
  createCourse() {
    if (this.createCourseForm.valid) {
      const courseData = this.createCourseForm.value;
      this.courseMgmtService.create(courseData).subscribe(mod => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/course']);
          this.toastService.displayToast(mod.message, 'success');
        }
        else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }
  getOrgs() {
    this.orgMgmtService.get().subscribe(mod => {
      this.orgs = mod.data;
    })
  }
}