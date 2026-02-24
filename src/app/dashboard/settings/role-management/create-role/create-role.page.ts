import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { IRoleModel } from 'src/app/shared/models/common-models/role-model';
import { IUserMenuMasterResponseModel } from 'src/app/shared/models/response-models/user-menu-master-response.model';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-create-role',
  templateUrl: 'create-role.page.html',
  styleUrls: ['create-role.page.scss'],
  standalone:false
})
export class CreateRolePage implements OnInit {
  orgId: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private roleService: RoleService, 
    private toastService: ToastService,private dataTransfer: DataTransferService) {

  }
  menuMasterModel: IUserMenuMasterResponseModel[] = [];
  roleForm: FormGroup = this.formBuilder.group({
    roleName: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.orgId = this.dataTransfer.getData(KeyContants.OrganizationId);
  }

  createRole() {
    let roleModel: IRoleModel = {
      id: '0',
      name: this.roleForm.get(HardCodedConstant.RoleName)?.value,
      organizationId: this.orgId
    };

    this.roleService.createRole(roleModel).subscribe(mod => {
      if (mod.success == true) {
        this.router.navigate(['/dashboard/settings/role/role-list']);
        this.toastService.displayToast(mod.message, 'success');
      }
      else {
        this.toastService.displayToast(mod.message, 'danger');
      }
    });
  }
}