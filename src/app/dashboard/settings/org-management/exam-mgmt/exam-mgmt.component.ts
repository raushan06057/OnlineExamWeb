import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ExamMgmtService } from "src/app/shared/services/exam-mgmt.service";
import { IExamModel } from "src/app/shared/models/common-models/exam.model";
@Component({
    selector: 'app-exam-mgmt',
    templateUrl: './exam-mgmt.component.html',
    styleUrls: ['./exam-mgmt.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule]
})
export class ExamMgmtComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private examMgmtService: ExamMgmtService) { }
    examForm: FormGroup = this.formBuilder.group({
        title: ['']
    });
    examModels: IExamModel[] = [];
    ngOnInit(): void {
        this.get();
    }
    get() {
        this.examMgmtService.get().subscribe(mod => {
            this.examModels = mod.data;
        });
    }
    searchExam() { }
    createExam() {
        this.router.navigate(['/dashboard/settings/create-exam']);
    }
    editExam(id:any){
        this.router.navigate(['/dashboard/settings/edit-exam/'+id]);
    }
    deleteExam(id:any,title:any){
        
    }
}