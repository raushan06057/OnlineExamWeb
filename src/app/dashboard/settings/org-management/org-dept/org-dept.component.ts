import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { IOrgDeptModel } from "src/app/shared/models/common-models/org-dept.model";
import { OrgDeptService } from "src/app/shared/services/org-dept.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-org-dept',
    templateUrl: './org-dept.component.html',
    styleUrls: ['./org-dept.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class OrgDeptComponent implements OnInit {

    orgDeptForm: FormGroup;
    orgs: IOrgModel[] = [];
    orgDepts: IOrgDeptModel[] = [];

    constructor(private orgMgmtService: OrgMgmtService, private orgDeptService: OrgDeptService,
        private formBuilder: FormBuilder, private router: Router) {
        this.orgDeptForm = this.formBuilder.group({
            name: ['']
        });
    }
    ngOnInit(): void {
        this.get();
    }

    get() {
        this.orgDeptService.get().subscribe(mod => {
            debugger;
            this.orgDepts = mod.data;
        });
    }

    getOrgs() {
        this.orgMgmtService.get().subscribe(mod => {
            this.orgs = mod.data;
        });
    }

    editOrgDept(id: any) {
        this.router.navigate(['/dashboard/settings/edit-org-dept/' + id]);
     }

    deleteOrgDept(id: any, name: any) { }

    searchOrgDepts() {

    }

    createOrgDepts() {
        this.router.navigate(['/dashboard/settings/create-org-dept']);
    }
}