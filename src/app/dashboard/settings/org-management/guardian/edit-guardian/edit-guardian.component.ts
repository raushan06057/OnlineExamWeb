import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { GuardianMgmtService } from "src/app/shared/services/guardian-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HardCodedConstant } from "src/app/shared/constants/hardcoded-constant";
import { IGuardianModel } from "src/app/shared/models/common-models/guardian.model";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";

@Component({
    selector: 'app-edit-guardian',
    templateUrl: './edit-guardian.component.html',
    styleUrls: ['./edit-guardian.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class EditGuardianComponent implements OnInit {
    guardianId:any;
    guardianModel:IGuardianModel={};
    constructor(private formBuilder: FormBuilder, private guardianMgmtService: GuardianMgmtService,
        private toastService: ToastService, private router: Router,private activatedRoute:ActivatedRoute, private orgMgmtService:OrgMgmtService) { 
            this.guardianId=this.activatedRoute.snapshot.paramMap.get(HardCodedConstant.Id);
        }
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
        this.getById();
    }
     getOrgs(){
        this.orgMgmtService.get().subscribe(mod=>{
        this.orgs=mod.data;
        });
    }
    getById(){
        this.guardianMgmtService.getById(this.guardianId).subscribe(mod=>{
            this.guardianModel=mod.data;
            this.createGuardianForm.patchValue({
                organizationId:this.guardianModel.organizationId,
                firstName:this.guardianModel.firstName,
                lastName:this.guardianModel.lastName,
                middleName: this.guardianModel.middleName,
                dateOfBirth: this.guardianModel.dateOfBirth,
                emailAddress: this.guardianModel.emailAddress,
                phoneNumber: this.guardianModel.phoneNumber,
                relationship: this.guardianModel.relationship
            });
        });
    }
    createGuardian() {
        if (this.createGuardianForm.valid) {
            const courseData = this.createGuardianForm.value;
            courseData.id=this.guardianId;
            this.guardianMgmtService.update(courseData).subscribe(mod => {
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