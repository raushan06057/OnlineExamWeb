import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { IRoleModel } from 'src/app/shared/models/common-models/role-model';
import { IUserMenuMasterResponseModel } from 'src/app/shared/models/response-models/user-menu-master-response.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: 'edit-role.page.html',
  styleUrls: ['edit-role.page.scss'],
  standalone:false
})
export class EditRolePage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private roleService: RoleService,
    private route: ActivatedRoute, private toastService: ToastService) {
    this.roleId = this.route.snapshot.paramMap.get(HardCodedConstant.Id);
  }

  roleForm: FormGroup = this.formBuilder.group({
    roleName: ['', [Validators.required]],
  });
  roleId: any;
  roleModel: IRoleModel[]=[];
  menuMasterModel: IUserMenuMasterResponseModel[] = [];
  ngOnInit(): void {
    this.getRoleById();
  }

  getRoleById() {
    this.roleService.getRoleById(this.roleId).subscribe(mod => {
      console.log(mod);
      if (mod.data != null) {
        this.roleModel = mod.data;
        this.roleForm.patchValue({
          roleName: this.roleModel[0].name
        });
      }
    });
  }
  roleModelData!:IRoleModel;
  editRole() {

    this.roleModelData = {
      id: this.roleId,
      name: this.roleForm.get(HardCodedConstant.RoleName)?.value
    };

    this.roleService.editRole(this.roleModelData).subscribe(mod => {
      if (mod.success == true) {
       
      }
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