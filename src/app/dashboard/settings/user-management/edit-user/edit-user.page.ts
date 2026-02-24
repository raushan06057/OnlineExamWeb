import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { IDepartmentModel } from 'src/app/shared/models/common-models/department-model';
import { IRoleModel } from 'src/app/shared/models/common-models/role-model';
import { IUserRequestModel } from 'src/app/shared/models/request-models/user-request.model';
import { IUserTypeModel } from 'src/app/shared/models/response-models/user-type.model';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: 'edit-user.page.html',
  styleUrls: ['edit-user.page.scss'],
  standalone: false
})
export class EditUserPage implements OnInit {

  userTypes: IUserTypeModel[] = [];
  roles: IRoleModel[] = [];
  departments: IDepartmentModel[] = [];

  createUserForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    role: ['', [Validators.required]],
    department: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, this.validateMobileNumber]]
  });
  userId: any;
  constructor(private router: Router, private userManagementService: UserManagementService, private roleService: RoleService,
    private formBuilder: FormBuilder, private dataTransfer: DataTransferService, private departmentService: DepartmentService,
    private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get(HardCodedConstant.Id);
    this.getUser(this.userId);
  }
  orgId: any;
  ngOnInit(): void {
    this.orgId = this.dataTransfer.getData(KeyContants.OrganizationId);
    this.getRoles();
    this.getDepartments();
  }
  userModel: IUserRequestModel = {};
  getUser(userId: any) {
    this.userManagementService.getUser(this.userId).subscribe(mod => {
      this.userModel = mod.data;
      debugger;
      this.createUserForm.patchValue({
        userName: this.userModel.userName,
        role: this.userModel.roleId,
        email: this.userModel.email,
        mobileNo: this.userModel.phoneNumber,
        department: this.userModel.departmentId
      });
    });
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
      "id": this.userId,
      "userName": this.createUserForm.get(HardCodedConstant.UserName)?.value,
      "email": this.createUserForm.get(HardCodedConstant.Email)?.value,     
      "userID": this.createUserForm.get(HardCodedConstant.UserID)?.value,
      "userType": this.createUserForm.get(HardCodedConstant.UserType)?.value,
      "role": this.createUserForm.get(HardCodedConstant.Role)?.value,
      "phoneNumber": this.createUserForm.get(HardCodedConstant.MobileNo)?.value,
      "organizationId": this.orgId,
      "departmentId": this.createUserForm.get(HardCodedConstant.Department)?.value
    };
    this.userManagementService.editUser(userRequestModel).subscribe(mod => {
      if (mod.success == true) {
        this.router.navigate(['/dashboard/settings/user/user-list']);
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