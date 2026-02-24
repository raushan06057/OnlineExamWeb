import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { GuardianMgmtService } from "src/app/shared/services/guardian-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";

@Component({
    selector: 'app-create-guardian',
    templateUrl: './create-guardian.component.html',
    styleUrls: ['./create-guardian.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class CreateGuardianComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private guardianMgmtService: GuardianMgmtService,
        private toastService: ToastService, private router: Router, private orgMgmtService:OrgMgmtService) { }
orgs:IOrgModel[]=[];
    createGuardianForm: FormGroup = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        dateOfBirth: ['', [Validators.required]],
        emailAddress: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        relationship: [''],
        organizationId:['',[Validators.required]]
    });

    ngOnInit(): void {
        this.getOrgs();
    }

    getOrgs(){
        this.orgMgmtService.get().subscribe(mod=>{
        this.orgs=mod.data;
        });
    }
    createGuardian() {
        if (this.createGuardianForm.valid) {
            const courseData = this.createGuardianForm.value;
            this.guardianMgmtService.create(courseData).subscribe(mod => {
                if (mod.success == true) {
                    this.router.navigate(['/dashboard/settings/guardian']);
                    this.toastService.displayToast(mod.message, 'success');
                }
                else {
                    this.toastService.displayToast(mod.message, 'danger');
                }
            });
        }
    }
}