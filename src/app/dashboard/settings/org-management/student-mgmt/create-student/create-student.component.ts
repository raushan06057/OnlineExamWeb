import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StudentMgmtService } from "src/app/shared/services/student-mgmt.service";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { OrgDeptService } from "src/app/shared/services/org-dept.service";
import { IOrgDeptModel } from "src/app/shared/models/common-models/org-dept.model";
import { IGuardianModel } from "src/app/shared/models/common-models/guardian.model";
import { GuardianMgmtService } from "src/app/shared/services/guardian-mgmt.service";

@Component({
    selector:'app-create-student',
    templateUrl:'./create-student.component.html',
    styleUrls:['./create-student.component.scss'],
    standalone:true,
    imports:[CommonModule,SettingsPageModule,ReactiveFormsModule]
})
export class CreateStudentComponent implements OnInit{
    constructor(private formBuilder:FormBuilder,private studentMgmtService:StudentMgmtService,private router:Router,
        private toastService:ToastService,private orgMgmtService:OrgMgmtService,private deptService:OrgDeptService,
        private guardianSerivce:GuardianMgmtService
    ){}
    createStudentForm:FormGroup=this.formBuilder.group({
      organizationId:['',[Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        dateOfBirth: [''],
        emailAddress: ['', [Validators.required, Validators.email]],
        phoneNumber: [''],
        address: [''],
        departmentId: ['', [Validators.required]],
        guardianId: ['', [Validators.required]]   
    });
    ngOnInit(): void {
        this.getOrgs();
    }
changeOrg(event:any){
  var orgId=event.target.value;
this.getGuardians();
this.getDepts();
this.departments=this.departmentList.filter(mod=>mod.organizationId==orgId);
this.guardians=this.guardianList.filter(mod=>mod.organizationId==orgId);
}

    orgs:IOrgModel[]=[];
    departmentList:IOrgDeptModel[]=[];
    departments:IOrgDeptModel[]=[];
     guardianList:IGuardianModel[]=[];
    guardians:IGuardianModel[]=[];
    createStudent() {
        if (this.createStudentForm.valid) {
          const model = this.createStudentForm.value;
          this.studentMgmtService.create(model).subscribe(mod => {
            if (mod.success == true) {
              this.router.navigate(['/dashboard/settings/student']);
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
      getDepts(){
        this.deptService.get().subscribe(mod=>{
            this.departmentList=mod.data;
        });
      }
      getGuardians(){
        this.guardianSerivce.get().subscribe(mod=>{
            this.guardianList=mod.data;
        });
      }
}