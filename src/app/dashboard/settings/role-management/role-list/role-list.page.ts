import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { IRoleModel } from 'src/app/shared/models/common-models/role-model';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-role-list',
  templateUrl: 'role-list.page.html',
  styleUrls: ['role-list.page.scss'],
  standalone: false
})
export class RoleListPage implements OnInit {

  constructor(private router: Router, private roleService: RoleService, private formBuilder: FormBuilder,
    private alertController: AlertController, private toastService: ToastService, private dataTransfer: DataTransferService) {

  }
  roles: IRoleModel[] = [];
  roleModel!: IRoleModel;
  orgId: any;
  ngOnInit(): void {
    this.orgId = this.dataTransfer.getData(KeyContants.OrganizationId);
    this.getRoles();
    
  }

  roleForm: FormGroup = this.formBuilder.group({
    roleName: ['', [Validators.required]],
  });

  getRoles() {
    this.roleService.getRolesByOrgId(this.orgId).subscribe(mod => {

      this.roles = mod.data;
    });
  }

  searchRoles() {

    if (this.roleForm.get(HardCodedConstant.RoleName)?.value == '') {
      this.getRoles();
    }
    else {
      this.roleModel = {
        name: this.roleForm.get(HardCodedConstant.RoleName)?.value
      };
      this.roleService.searchRoles(this.roleModel).subscribe(mod => {
        this.roles = mod.data;
      });
    }

  }

  createRole() {
    this.router.navigate(['/dashboard/settings/role/create-role'])
  }

  editRole(id: any) {
    this.router.navigate(['/dashboard/settings/role/edit-role/' + id])
  }

  public currentPage = 1;
  itemsPerPage: number = 1;
  message: any;
  id: any;
  deleteRole(id: any, name: any) {
    this.id = id;
    this.message = "Do you want to delete " + name + " ?";
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: this.message,
      buttons: this.alertButtons,
    });

    await alert.present();
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.message = 'Alert canceled';
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.message = 'Alert confirmed';
        this.roleService.deleteRole(this.id).subscribe(mod => {
          if (mod.success == true) {
            this.searchRoles();
            this.toastService.displayToast(mod.message, 'success');
          }
          else {
            this.toastService.displayToast(mod.message, 'danger');
          }
        });
      },
    },
  ];
}