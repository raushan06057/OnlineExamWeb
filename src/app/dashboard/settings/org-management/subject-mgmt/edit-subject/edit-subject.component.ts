import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { IGuardianModel } from 'src/app/shared/models/common-models/guardian.model';
import { IOrgDeptModel } from 'src/app/shared/models/common-models/org-dept.model';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
import { OrgDeptService } from 'src/app/shared/services/org-dept.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SettingsPageModule } from '../../../settings.module';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, SettingsPageModule],
})
export class EditSubjectComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private orgMgmtService: OrgMgmtService,
    private deptService: OrgDeptService,
    private courseService: CourseMgmtService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService
  ) {
    this.subjectId = this.activatedRoute.snapshot.paramMap.get(
      HardCodedConstant.Id
    );
  }
  subjectId: any;
  createSubjectForm: FormGroup = this.formBuilder.group({
    orgId: ['', [Validators.required]],
    departmentId: ['', [Validators.required]],
    courseId: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getOrgs();
  }

  orgs: IOrgModel[] = [];
  departments: IOrgDeptModel[] = [];
  guardians: IGuardianModel[] = [];
  courses: ICourseModel[] = [];

  createStudent() {
    if (this.createSubjectForm.valid) {
      const model = this.createSubjectForm.value;
      this.subjectService.create(model).subscribe((mod) => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/subject']);
          this.toastService.displayToast(mod.message, 'success');
        } else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }

  getOrgs() {
    this.orgMgmtService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }

  getDepts(event: any) {
    debugger;
    const orgId = Number(event.target.value);
    this.deptService.get().subscribe((mod) => {
      this.departments = mod.data;
      debugger;
      this.departments = this.departments.filter(
        (dept) => dept.organizationId == orgId
      );
    });
  }

  getCourses(event: any) {
    const orgId = Number(event.target.value);
    this.courseService.get().subscribe((mod) => {
      this.courses = mod.data;
      this.courses = this.courses.filter((mod) => mod.organizationId == orgId);
    });
  }
}