import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { SettingsPageModule } from "../../settings.module";
import { HardCodedConstant } from "src/app/shared/constants/hardcoded-constant";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";

@Component({
    selector: 'app-edit-org',
    templateUrl: './edit-org.component.html',
    styleUrls: ['./edit-org.component.scss'],
    imports:[CommonModule,SettingsPageModule,ReactiveFormsModule],
    standalone:true
})
export class EditOrgComponent implements OnInit {
    createOrgForm: FormGroup;
    orgModel:IOrgModel={};
        constructor(private formBuilder: FormBuilder,private orgMgmtService:OrgMgmtService,
            private toastService: ToastService,private router: Router,private route: ActivatedRoute) {
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
        orgId:any;
        ngOnInit(): void {
           this.orgId = this.route.snapshot.paramMap.get(HardCodedConstant.Id);
           this.orgMgmtService.getById(this.orgId).subscribe(mod=>{
            this.orgModel=mod.data;
              this.createOrgForm.patchValue({
                name: this.orgModel.name,
                description: this.orgModel.description,
                street: this.orgModel.street,
                city: this.orgModel.city,
                state: this.orgModel.state,
                country: this.orgModel.country,
                postalCode: this.orgModel.postalCode,
                foundingDate: this.orgModel.foundingDate,
                industry: this.orgModel.industry,
                website: this.orgModel.website
              });
           });
        }
        createOrg() {
            if (this.createOrgForm.valid) {
              const orgData = this.createOrgForm.value;
              orgData.id=this.orgId;
                this.orgMgmtService.update(orgData).subscribe(mod=>{
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