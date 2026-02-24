import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { OrgDeptService } from "src/app/shared/services/org-dept.service";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { HardCodedConstant } from "src/app/shared/constants/hardcoded-constant";
import { IOrgDeptModel } from "src/app/shared/models/common-models/org-dept.model";

@Component({
    selector: 'app-edit-org-dept',
    templateUrl: './edit-org-dept.component.html',
    styleUrls: ['./edit-org-dept.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule]
})
export class EditOrgDeptComponent implements OnInit {
    createEntityForm: FormGroup;
    orgs: IOrgModel[] = [];
    deptModel: IOrgDeptModel = {};
    constructor(private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService, private router: Router, private toastService: ToastService,
        private orgDeptService: OrgDeptService, private route: ActivatedRoute
    ) {
        this.createEntityForm = this.formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: ['', Validators.required],
            organizationId: ['', Validators.required]
        });
    }

    deptId: any;

    ngOnInit(): void {
        this.deptId = this.route.snapshot.paramMap.get(HardCodedConstant.Id);
        this.getOrgs();
        this.getOrgDept();
    }

    createEntity() {
        debugger;
        if (this.createEntityForm.valid) {
            const orgData = this.createEntityForm.value;
            orgData.id = this.deptId;
            this.orgDeptService.update(orgData).subscribe(mod => {
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

    getOrgDept() {
        this.orgDeptService.getById(this.deptId).subscribe(mod => {
            this.deptModel = mod.data;
            this.createEntityForm.patchValue({
                name: this.deptModel.name,
                code: this.deptModel.code,
                description: this.deptModel.description,
                organizationId: this.deptModel.organizationId
            });
        });
    }
}