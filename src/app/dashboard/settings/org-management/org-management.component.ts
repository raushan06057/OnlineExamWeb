import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../settings.module";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-org-management',
    templateUrl: './org-management.component.html',
    styleUrls: ['./org-management.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class OrgManagement implements OnInit {
    orgs: IOrgModel[] = [];
    constructor(private router: Router,private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService) { }
    ngOnInit(): void {
        this.getOrgs();
    }

    orgForm: FormGroup = this.formBuilder.group({
        orgName: ['', [Validators.required]],
    });
  
    getOrgs() {
        this.orgMgmtService.get().subscribe(mod => {
            this.orgs = mod.data;
        })
    }
    searchOrgs() { }
    createOrg() {
        this.router.navigate(['/dashboard/settings/create-org-mgmt']);
     }
    editOrg(id: any) {
        this.router.navigate(['/dashboard/settings/edit-org-mgmt/' + id])
    }
    deleteOrg(id: any, name: any) { }
}