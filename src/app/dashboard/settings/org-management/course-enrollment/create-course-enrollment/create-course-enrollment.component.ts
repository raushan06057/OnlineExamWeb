import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingsPageModule } from '../../../settings.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CourseEnrollmentService } from 'src/app/shared/services/course-enrollment.service';
import { StudentMgmtService } from 'src/app/shared/services/student-mgmt.service';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
import { IStudentModel } from 'src/app/shared/models/common-models/student.model';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';

@Component({
  selector: 'app-create-course-enrollment',
  templateUrl: './create-course-enrollment.component.html',
  styleUrls: ['./create-course-enrollment.component.scss'],
  standalone: true,
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
})
export class CreateCourseEnrollmentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private courseEnrollmentService: CourseEnrollmentService,
    private router: Router,
    private toastService: ToastService,
    private studentMgmtService: StudentMgmtService,
    private courseMgmtService: CourseMgmtService,
    private orgMgmtService: OrgMgmtService,
  ) {}

  createEnrollmentForm: FormGroup = this.formBuilder.group({
    organizationId: ['', [Validators.required]],
    studentId: ['', [Validators.required]],
    courseId: ['', [Validators.required]],
    enrollmentDate: ['', [Validators.required]],
    completionDate: [''],
    grade: [''],
  });

  ngOnInit(): void {
    this.getOrgs();
    this.getStudentList();
    this.getCoursesList();
  }
  getOrgs() {
    this.orgMgmtService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }
  orgs: IOrgModel[] = [];
  studentList: IStudentModel[] = [];
  students: IStudentModel[] = [];
  courseList: ICourseModel[] = [];
  courses: ICourseModel[] = [];

  createEnrollment() {
    if (this.createEnrollmentForm.valid) {
      const model = this.createEnrollmentForm.value;
      this.courseEnrollmentService.create(model).subscribe((mod) => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/course-enrollment']);
          this.toastService.displayToast(mod.message, 'success');
        } else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }

  getStudentList() {
    this.studentMgmtService.get().subscribe((mod) => {
      this.studentList = mod.data;
    });
  }

  getCoursesList() {
    this.courseMgmtService.get().subscribe((mod) => {
      this.courseList = mod.data;
    });
  }
  getCourses(event: any) {
    let orgId = event.target.value;
    this.courses = this.courseList.filter((mod) => mod.organizationId == orgId);
  }

  getStudents(event: any) {
    let orgId = event.target.value;
    this.students = this.studentList.filter(
      (mod) => mod.organizationId == orgId,
    );
  }
}
