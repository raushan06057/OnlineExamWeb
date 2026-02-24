import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsPageModule } from '../../../settings.module';
import { Router } from '@angular/router';
import { IGuardianModel } from 'src/app/shared/models/common-models/guardian.model';
import { IOrgDeptModel } from 'src/app/shared/models/common-models/org-dept.model';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
import { GuardianMgmtService } from 'src/app/shared/services/guardian-mgmt.service';
import { OrgDeptService } from 'src/app/shared/services/org-dept.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ICourseModel } from 'src/app/shared/models/common-models/course.model';
import { CourseMgmtService } from 'src/app/shared/services/course-mgmt.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, SettingsPageModule],
  standalone: true,
})
export class CreateSubjectComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private orgMgmtService: OrgMgmtService,
    private deptService: OrgDeptService,
    private courseService: CourseMgmtService,
    private guardianSerivce: GuardianMgmtService,
    private subjectService:SubjectService
  ) {}

  createSubjectForm: FormGroup = this.formBuilder.group({
    orgId: ['', [Validators.required]],
    departmentId: ['', [Validators.required]],
    courseId:['',[Validators.required]],
    name:['',[Validators.required]]
  });

  ngOnInit(): void {
    this.getOrgs();
    // this.getDepts();
    this.getGuardians();
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

  getGuardians() {
    this.guardianSerivce.get().subscribe((mod) => {
      this.guardians = mod.data;
    });
  }
}
