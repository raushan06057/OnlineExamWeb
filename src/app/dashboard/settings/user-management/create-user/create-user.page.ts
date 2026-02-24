import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { IDepartmentModel } from 'src/app/shared/models/common-models/department-model';
import { IRoleModel } from 'src/app/shared/models/common-models/role-model';
import { IUserTypeModel } from 'src/app/shared/models/response-models/user-type.model';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-create-user',
  templateUrl: 'create-user.page.html',
  styleUrls: ['create-user.page.scss'],
  standalone: false
})
export class CreateUserPage implements OnInit {

  userTypes: IUserTypeModel[] = [];
  roles: IRoleModel[] = [];
  departments: IDepartmentModel[] = [];

  createUserForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', [Validators.required]],
    department: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, this.validateMobileNumber]]
  });

  constructor(private router: Router, private userManagementService: UserManagementService, private roleService: RoleService,
    private formBuilder: FormBuilder, private dataTransfer: DataTransferService, private departmentService: DepartmentService,private toastService: ToastService,) { }
  orgId: any;
  ngOnInit(): void {
    this.orgId = this.dataTransfer.getData(KeyContants.OrganizationId);
    this.getRoles();
    this.getDepartments();
  }

  getRoles() {
    this.roleService.getRolesByOrgId(this.orgId).subscribe(mod => {
      this.roles = mod.data;
    });
  }

  getDepartments() {
    this.departmentService.getDepartments(this.orgId).subscribe(mod => {
      this.departments = mod.data;
    });
  }
  createUser() {

    let userRequestModel = {
      "id": "0",
      "userName": this.createUserForm.get(HardCodedConstant.UserName)?.value,
      "email": this.createUserForm.get(HardCodedConstant.Email)?.value,
      "pwd": this.createUserForm.get(HardCodedConstant.Password)?.value,
      "userID": this.createUserForm.get(HardCodedConstant.UserID)?.value,
      "userType": this.createUserForm.get(HardCodedConstant.UserType)?.value,
      "role": this.createUserForm.get(HardCodedConstant.Role)?.value,
      "phoneNumber": this.createUserForm.get(HardCodedConstant.MobileNo)?.value,
      "organizationId": this.orgId,
      "departmentId": this.createUserForm.get(HardCodedConstant.Department)?.value
    };
    this.userManagementService.createUser(userRequestModel).subscribe(mod => {
      if (mod.success == true) {
        this.router.navigate(['/dashboard/settings/user/user-list']);
         this.toastService.displayToast(mod.message, 'success');
      }else{
        this.toastService.displayToast(mod.message, 'danger');
      }
    });
  }

  validateMobileNumber(control: FormControl): { [s: string]: boolean } | null {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(control.value)) {
      return { 'invalidMobile': true };
    }
    return null;
  }
}