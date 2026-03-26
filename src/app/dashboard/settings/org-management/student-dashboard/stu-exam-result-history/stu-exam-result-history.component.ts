import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IStudentExamResultModel } from "src/app/shared/models/common-models/student-exam-result.model";
import { StudentMgmtService } from "src/app/shared/services/student-mgmt.service";

@Component({
    selector:'app-stu-exam-result-history',
    styleUrls:['./stu-exam-result-history.component.scss'],
    templateUrl:'./stu-exam-result-history.component.html',
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule]
})
export class StuExamResultHistoryComponent implements OnInit{
     constructor(private formBuilder: FormBuilder, private router: Router, private studentService:StudentMgmtService) { }
       examForm: FormGroup = this.formBuilder.group({
           title: ['']
       });
       resultModels: IStudentExamResultModel[] = [];
       ngOnInit(): void {
           this.get();
       }
       get() {
           this.studentService.getStudentExamResults().subscribe(mod => {
               this.resultModels = mod.data;
           });
       }
       searchExam() { }
       createExam() {
           this.router.navigate(['/dashboard/settings/create-exam']);
       }
       editExam(id: any) {
           this.router.navigate(['/ongoing-exam/' + id]);
       }
       deleteExam(id: any, title: any) {
   
       }
}