import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsPageModule } from '../../../settings.module';
import { IOrgDeptModel } from 'src/app/shared/models/common-models/org-dept.model';
import { OrgDeptService } from 'src/app/shared/services/org-dept.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
import { ExamMgmtService } from 'src/app/shared/services/exam-mgmt.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { ISubjectModel } from 'src/app/shared/models/common-models/subject.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
@Component({
  selector: 'app-exam-mgmt',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
})
export class CreateExamComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private deptService: OrgDeptService,
    private orgService: OrgMgmtService,
    private examService: ExamMgmtService,
    private router: Router,
    private toastService: ToastService,
    private courseMgmt: CourseMgmtService,
    private subjectService: SubjectService,
  ) {}

  createExamForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    durationInMinutes: [0, Validators.required],
    organizationId: ['', Validators.required],
    departmentId: ['', Validators.required],
    courseId: ['', [Validators.required]],
    subjectId: ['', [Validators.required]],
    totalMarks: [0, Validators.required],
    passingMarks: [0, Validators.required],
    isScheduled: [false],
  });

  departments: IOrgDeptModel[] = [];
  orgs: IOrgModel[] = [];
  courses: ICourseModel[] = [];
  subjects: ISubjectModel[] = [];

  ngOnInit(): void {
    this.getOrgs();
  }
  getOrgs() {
    this.orgService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }
  getDepts(event:any) {
    var orgId=Number(event.target.value);
    this.deptService.get().subscribe((mod) => {
      this.departments = mod.data.filter(mod=>mod.organizationId==orgId);
    });
  }

  getCourses(event: any) {
    let orgId = Number(event.target.value);
    this.courseMgmt.get().subscribe((mod) => {
      this.courses = mod.data.filter((mod) => mod.organizationId == orgId);
      console.log(this.courses);
    });
  }

  getSubjects(event: any) {
    debugger;
    var courseId = Number(event.target.value);
    this.subjectService.get().subscribe((mod) => {
      this.subjects = mod.data.filter((mod) => mod.courseId == courseId);
      console.log(this.subjects);
    });
  }
  createExam() {
    if (this.createExamForm.valid) {
      const model = this.createExamForm.value;
      this.examService.create(model).subscribe((mod) => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/exam']);
          this.toastService.displayToast(mod.message, 'success');
        } else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }
}