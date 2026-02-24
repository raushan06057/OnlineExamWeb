import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { IResetPasswordModel } from 'src/app/shared/models/request-models/reset-password.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private userManagementService: UserManagementService,
    private toastService: ToastService) {
  }

  resetPasswordForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {

  }
  message: any;
  resetPasswordModel!: IResetPasswordModel;
  resetPassword() {
    this.resetPasswordModel = {
      userName: this.resetPasswordForm.get(HardCodedConstant.UserName)?.value,
      password: this.resetPasswordForm.get(HardCodedConstant.Password)?.value,
    };
    this.userManagementService.resetPassword(this.resetPasswordModel).subscribe(mod => {
      if (mod.success == true) {
        this.clear();
        this.toastService.displayToast(mod.message, 'success');
      }
    });
  }

  clear() {
    this.resetPasswordForm.patchValue({
      userName: '',
      password: '',
      confirmPassword: ''
    });
  }
}