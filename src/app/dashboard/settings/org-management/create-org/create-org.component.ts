import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { OrgManagement } from "../org-management.component";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
  standalone: true
})
export class CreateOrgComponent implements OnInit {
  createOrgForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService,
    private toastService: ToastService, private router: Router) {
    this.createOrgForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
      foundingDate: ['', Validators.required],
      industry: [''],
      website: ['']
    });
  }
  ngOnInit(): void {
  }
  createOrg() {
    if (this.createOrgForm.valid) {
      const orgData = this.createOrgForm.value;
      this.orgMgmtService.create(orgData).subscribe(mod => {
        if (mod.success == true) {
          this.router.navigate(['/dashboard/settings/org-mgmt']);
          this.toastService.displayToast(mod.message, 'success');
        }
        else {
          this.toastService.displayToast(mod.message, 'danger');
        }
      });
    }
  }
}