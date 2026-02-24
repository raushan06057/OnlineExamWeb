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
import { IGuardianModel } from 'src/app/shared/models/common-models/guardian.model';
import { IOrgDeptModel } from 'src/app/shared/models/common-models/org-dept.model';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';
import { GuardianMgmtService } from 'src/app/shared/services/guardian-mgmt.service';
import { OrgDeptService } from 'src/app/shared/services/org-dept.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { StudentMgmtService } from 'src/app/shared/services/student-mgmt.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { IStudentModel } from 'src/app/shared/models/common-models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
  standalone: true,
})
export class EditStudentComponent implements OnInit {
  studentId: any;
  constructor(
    private formBuilder: FormBuilder,
    private studentMgmtService: StudentMgmtService,
    private router: Router,
    private toastService: ToastService,
    private orgMgmtService: OrgMgmtService,
    private deptService: OrgDeptService,
    private guardianSerivce: GuardianMgmtService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.studentId = this.activatedRoute.snapshot.paramMap.get(
      HardCodedConstant.Id,
    );
  }
  createStudentForm: FormGroup = this.formBuilder.group({
    organizationId: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    middleName: [''],
    dateOfBirth: [''],
    emailAddress: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    address: [''],
    departmentId: ['', [Validators.required]],
    guardianId: ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.getOrgs();
    this.getDepts();
    this.getGuardians();
    this.get();
  }
  orgs: IOrgModel[] = [];
  departmentList: IOrgDeptModel[] = [];
  departments: IOrgDeptModel[] = [];
  guardianList: IGuardianModel[] = [];
  guardians: IGuardianModel[] = [];

  studentModel: IStudentModel = {};
  get() {
    this.studentMgmtService.getById(this.studentId).subscribe((mod) => {
      this.studentModel = mod.data;
      debugger;
      this.departments = this.departmentList.filter(
        (mod) => mod.organizationId == this.studentModel.organizationId,
      );
      this.guardians = this.guardianList.filter(
        (mod) => mod.organizationId == this.studentModel.organizationId,
      );
      const dob = new Date(mod.data.dateOfBirth);
      dob.setDate(dob.getDate() + 1);
      const formattedDateOfBirth = new Date(dob).toISOString().split('T')[0];
      this.createStudentForm.patchValue({
        organizationId:this.studentModel.organizationId,
        firstName: this.studentModel.firstName,
        lastName: this.studentModel.lastName,
        middleName: this.studentModel.middleName,
        dateOfBirth: formattedDateOfBirth,
        emailAddress: this.studentModel.emailAddress,
        phoneNumber: this.studentModel.phoneNumber,
        address: this.studentModel.address,
        departmentId: this.studentModel.departmentId,
        guardianId: this.studentModel.guardianId,
      });
    });
  }
  createStudent() {
    if (this.createStudentForm.valid) {
      const model = this.createStudentForm.value;
      model.id = this.studentId;
      debugger;
      this.studentMgmtService.update(model).subscribe((mod) => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/student']);
          this.toastService.displayToast(mod.message, 'success');
        } else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }

  changeOrg(event: any) {
    var orgId = event.target.value;
    this.getGuardians();
    this.getDepts();
    this.departments = this.departmentList.filter(
      (mod) => mod.organizationId == orgId,
    );
    this.guardians = this.guardianList.filter(
      (mod) => mod.organizationId == orgId,
    );
  }

  getOrgs() {
    this.orgMgmtService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }
  getDepts() {
    this.deptService.get().subscribe((mod) => {
      this.departmentList = mod.data;
    });
  }
  getGuardians() {
    this.guardianSerivce.get().subscribe((mod) => {
      this.guardianList = mod.data;
    });
  }
}
