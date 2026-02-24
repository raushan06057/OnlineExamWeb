import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { OrgDeptService } from "src/app/shared/services/org-dept.service";

@Component({
    selector: 'app-create-org-dept',
    templateUrl: './create-org-dept.component.html',
    styleUrls: ['./create-org-dept.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class CreateOrgDeptComponent implements OnInit {
    createEntityForm: FormGroup;
    orgs: IOrgModel[] = [];
    constructor(private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService, private router: Router, private toastService: ToastService,
        private orgDeptService:OrgDeptService 
    ) {
        this.createEntityForm = this.formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: ['', Validators.required],
            organizationId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.getOrgs();
    }
    createEntity() {
        debugger;
        if (this.createEntityForm.valid) {
            const orgData = this.createEntityForm.value;
            this.orgDeptService.create(orgData).subscribe(mod => {
                if (mod.success == true) {
                    this.router.navigate(['/dashboard/settings/org-dept']);
                    this.toastService.displayToast(mod.message, 'success');
                }
                else {
                    this.toastService.displayToast(mod.message, 'danger');
                }
            });
        }
    }
    getOrgs() {
        this.orgMgmtService.get().subscribe(mod => {
            this.orgs = mod.data;
        });
    }
}