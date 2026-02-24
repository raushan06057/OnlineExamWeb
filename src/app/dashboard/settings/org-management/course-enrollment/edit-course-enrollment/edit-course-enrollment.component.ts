import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingsPageModule } from '../../../settings.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { IStudentModel } from 'src/app/shared/models/common-models/student.model';
import { CourseEnrollmentService } from 'src/app/shared/services/course-enrollment.service';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
import { StudentMgmtService } from 'src/app/shared/services/student-mgmt.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { ICourseEnrollmentModel } from 'src/app/shared/models/common-models/course-enrollment.model';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
@Component({
  selector: 'app-edit-course-enrollment',
  templateUrl: './edit-course-enrollment.component.html',
  styleUrls: ['./edit-course-enrollment.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
  standalone: true,
})
export class EditCourseEnrollment implements OnInit {
  enrollmentId: any;
  constructor(
    private formBuilder: FormBuilder,
    private courseEnrollmentService: CourseEnrollmentService,
    private router: Router,
    private toastService: ToastService,
    private studentMgmtService: StudentMgmtService,
    private courseMgmtService: CourseMgmtService,
    private orgMgmtService: OrgMgmtService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.enrollmentId = this.activatedRoute.snapshot.paramMap.get(
      HardCodedConstant.Id,
    );
  }

  courseEnrollmentModel: ICourseEnrollmentModel = {};

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
    this.get();
  }

  get() {
    this.courseEnrollmentService.getById(this.enrollmentId).subscribe((mod) => {
      this.courseEnrollmentModel = mod.data;
      debugger;
      this.students = this.studentList.filter(
        (mod) =>
          mod.organizationId == this.courseEnrollmentModel.organizationId,
      );
      this.courses = this.courseList.filter(
        (mod) =>
          mod.organizationId == this.courseEnrollmentModel.organizationId,
      );

      const completionDate = new Date(mod.data.completionDate);
      completionDate.setDate(completionDate.getDate() + 1);
      const formattedCompletionDate = new Date(completionDate)
        .toISOString()
        .split('T')[0];

      const enrollmentDate = new Date(mod.data.enrollmentDate);
      enrollmentDate.setDate(enrollmentDate.getDate() + 1);
      const formattedEnrollmentDate = new Date(enrollmentDate)
        .toISOString()
        .split('T')[0];
      const courseId = this.courseEnrollmentModel.courseId;
      this.createEnrollmentForm.patchValue({
        organizationId: this.courseEnrollmentModel.organizationId,
        studentId: this.courseEnrollmentModel.studentId,
        completionDate: formattedCompletionDate,
        enrollmentDate: formattedEnrollmentDate,
        courseId: courseId,
        grade: this.courseEnrollmentModel.grade,
      });
    });
  }
  //  completionDate: this.courseEnrollmentModel.completionDate,
  //
  //
  //         enrollmentDate: this.courseEnrollmentModel.enrollmentDate,

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
      model.id = this.enrollmentId;
      this.courseEnrollmentService.update(model).subscribe((mod) => {
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