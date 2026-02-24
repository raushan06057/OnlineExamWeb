import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IOrgModel } from "src/app/shared/models/common-models/org.model";
import { CourseMgmtService } from "src/app/shared/services/course-mgmt.service";
import { OrgMgmtService } from "src/app/shared/services/org-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { HardCodedConstant } from "src/app/shared/constants/hardcoded-constant";
import { ICourseModel } from "src/app/shared/models/common-models/course.model";
import { Title } from "@angular/platform-browser";
@Component({
    selector:'app-edit-course',
    templateUrl:'./edit-course.component.html',
    styleUrls:['./edit-course.component.scss'],
    imports:[CommonModule,SettingsPageModule,ReactiveFormsModule],
    standalone:true
})
export class EditCourseComponent implements OnInit{
   orgs: IOrgModel[] = [];
   courseId:any;
   courseModel:ICourseModel={};
       constructor(private formBuilder: FormBuilder, private orgMgmtService: OrgMgmtService,private router:Router, private toastService: ToastService, private activatedRoute:ActivatedRoute,
         private courseMgmtService:CourseMgmtService
       ) {
            this.courseId=this.activatedRoute.snapshot.paramMap.get(HardCodedConstant.Id);
        }
       ngOnInit(): void {
           this.getOrgs();
            this.getById(this.courseId);
       }
       getById(courseId:any){
        this.courseMgmtService.getById(courseId).subscribe(mod=>{
            this.courseModel=mod.data;
            this.createCourseForm.patchValue({
                title:this.courseModel.title,
                description:this.courseModel.description,
                credits:this.courseModel.credits,
                organizationId:this.courseModel.organizationId
            });
        });
       }
       createCourseForm: FormGroup = this.formBuilder.group({
           title: ['', [Validators.required]],
           description: ['', [Validators.required]],
           credits: ['', [Validators.required]],
           organizationId: ['', [Validators.required]]
       });
       createCourse() { 
           if (this.createCourseForm.valid) {
               const courseData = this.createCourseForm.value;
               courseData.id=this.courseId;
               this.courseMgmtService.update(courseData).subscribe(mod => {
                 if (mod.success == true) {
                   this.router.navigate(['/dashboard/settings/course']);
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
           })
       }
}