import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { KeyContants } from 'src/app/shared/constants/key-constants';
import { IUserRequestModel } from 'src/app/shared/models/request-models/user-request.model';
import { IUserTypeModel } from 'src/app/shared/models/response-models/user-type.model';
import { DataTransferService } from 'src/app/shared/services/data-transfer-service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.page.html',
  styleUrls: ['user-list.page.scss'],
  standalone:false
})
export class UserListPage implements OnInit {

  userTypes: IUserTypeModel[] = [];
  orgId:any;
  constructor(private router: Router, private userManagementService: UserManagementService, private roleService: RoleService,
    private formBuilder: FormBuilder, private alertController: AlertController, private toastService: ToastService, private dataTransfer: DataTransferService) { }
  ngOnInit(): void {
    this.orgId = this.dataTransfer.getData(KeyContants.OrganizationId);
    this.getUsers();
  }

  searchUserForm: FormGroup = this.formBuilder.group({
    userName: [''],
    userType: ['']
  });

  users: IUserRequestModel[] = [];
  getUsers() {
    this.userManagementService.getUsers(this.orgId).subscribe(mod => {
      debugger;
      console.log(mod.data);
      this.users = mod.data;
    });
  }

  searchUser() {
    let searchUser = {
      username: this.searchUserForm.get(HardCodedConstant.UserName)?.value,
      userType: this.searchUserForm.get(HardCodedConstant.UserType)?.value,
    };

    this.userManagementService.searchUsers(searchUser).subscribe(mod => {
      this.users = mod.data;
    });
  }

  createUser() {
    this.router.navigate(['/dashboard/settings/user/create-user']);
  }

  editUser(id: any) {
    this.router.navigate(['/dashboard/settings/user/edit-user/' + id]);
  }

  message: any;
  id: any;
  deleteUser(id: any, username: any) {
    this.id = id;
    this.message = "Do you want to delete " + username + " ?";
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
        this.userManagementService.deleteUser(this.id).subscribe(mod => {
          if (mod.success == true) {
            this.searchUser();
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