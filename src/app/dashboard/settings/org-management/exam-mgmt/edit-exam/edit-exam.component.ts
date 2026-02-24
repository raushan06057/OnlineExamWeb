import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsPageModule } from '../../../settings.module';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrgDeptModel } from 'src/app/shared/models/common-models/org-dept.model';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
import { ExamMgmtService } from 'src/app/shared/services/exam-mgmt.service';
import { OrgDeptService } from 'src/app/shared/services/org-dept.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CommonConstant } from 'src/app/shared/constants/common-constant';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { IExamModel } from 'src/app/shared/models/common-models/exam.model';
import { ISubjectModel } from 'src/app/shared/models/common-models/subject.model';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
@Component({
  selector: 'app-exam-mgmt',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
})
export class EditExamComponent implements OnInit {
  examId: any;
  courses: ICourseModel[] = [];
  courseList: ICourseModel[] = [];
  subjects: ISubjectModel[] = [];
   subjectList: ISubjectModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private deptService: OrgDeptService,
    private orgService: OrgMgmtService,
    private examService: ExamMgmtService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private courseMgmt: CourseMgmtService,
    private subjectService: SubjectService,
  ) {
    this.examId = this.activatedRoute.snapshot.paramMap.get(
      HardCodedConstant.Id,
    );
  }
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
  departmentList: IOrgDeptModel[] = [];
  orgs: IOrgModel[] = [];
  examModel: IExamModel = {};
  ngOnInit(): void {
    //    this.getDepts();
    this.getOrgs();
    this.get();
  }

  getOrgs() {
    this.orgService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }

  getDepts(event: any) {
    var orgId = Number(event.target.value);
    this.getDeptList();
    this.departments = this.departmentList.filter(
      (mod) => mod.organizationId == orgId,
    );
  }

  getDeptList() {
    this.deptService.get().subscribe((mod) => {
      this.departmentList = mod.data;
    });
  }

  getCourses(event: any) {
    let orgId = Number(event.target.value);
    this.courses = this.courseList.filter((mod) => mod.organizationId == orgId);
  }

  getCourseList() {
    this.courseMgmt.get().subscribe((mod) => {
      this.courseList = mod.data;
    });
  }

  get() {
    this.getDeptList();
    this.getCourseList();
    this.getSubjectList();
    this.examService.getById(this.examId).subscribe((mod) => {
      this.examModel = mod.data;
      this.departments = this.departmentList.filter(
        (mod) => mod.organizationId == this.examModel.organizationId,
      );
      this.courses = this.courseList.filter(
        (mod) => mod.organizationId == this.examModel.organizationId,
      );

      this.subjects=this.subjectList.filter(mod=>mod.courseId==this.examModel.courseId);
      const startDate = new Date(mod.data.startDate);
      startDate.setDate(startDate.getDate() + 1);
      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split('T')[0];

      const endDate = new Date(mod.data.endDate);
      endDate.setDate(endDate.getDate() + 1);
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

      this.createExamForm.patchValue({
        title: this.examModel.title,
        description: this.examModel.description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        durationInMinutes: this.examModel.durationInMinutes,
        organizationId: this.examModel.organizationId,
        departmentId: this.examModel.departmentId,
        courseId:this.examModel.courseId,
        subjectId:this.examModel.subjectId,
        totalMarks: this.examModel.totalMarks,
        passingMarks: this.examModel.passingMarks,
        isScheduled: this.examModel.isScheduled,
      });
    });
  }
  createExam() {
    if (this.createExamForm.valid) {
      const model = this.createExamForm.value;
      model.id = this.examId;
      this.examService.update(model).subscribe((mod) => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/exam']);
          this.toastService.displayToast(mod.message, 'success');
        } else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }

  getSubjectList(){
     this.subjectService.get().subscribe((mod) => {
      this.subjectList = mod.data;//.filter((mod) => mod.courseId == courseId);
    });
  }
  getSubjects(event: any) {
    var courseId = Number(event.target.value);
   this.getSubjectList();
   this.subjects=this.subjectList.filter(mod=>mod.courseId==courseId);
  }
}
