import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from '../shared/services/data-transfer-service';
import { KeyContants } from '../shared/constants/key-constants';
import { ToastService } from '../shared/services/toast.service';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  message: any;
  decodedToken: any;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private dataTransferService: DataTransferService, private toastService: ToastService) { }
  ngOnInit(): void {

  }
  userLoginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberLogin: [false]
  });
  signIn() {
    let loginRequestModel = {
      username: this.userLoginForm.get('username')?.value,
      password: this.userLoginForm.get('password')?.value,
      rememberLogin: this.userLoginForm.get('rememberLogin')?.value,
    };
    this.loginService.login(loginRequestModel).subscribe(mod => {
      debugger;
      if (mod.success == true) {
        this.dataTransferService.setData(KeyContants.Token, mod.data);
        this.dataTransferService.setData(KeyContants.OrganizationId, mod.organizationId);
        // this.decodedToken = jwtDecode(mod.data);
        if (mod.roleName == 'Student') {
          this.router.navigate(['/student-dashboard']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
        // this.router.navigate(['/dashboard']);
      }
      else {
        this.toastService.displayToast(mod.message, 'danger');
      }
    });

  }
}