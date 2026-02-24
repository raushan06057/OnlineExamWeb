import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IExamModel } from "src/app/shared/models/common-models/exam.model";
import { ExamMgmtService } from "src/app/shared/services/exam-mgmt.service";
import { StudentMgmtService } from "src/app/shared/services/student-mgmt.service";
@Component({
    selector: 'app-exam-schedule',
    templateUrl: './exam-schedule.component.html',
    styleUrls: ['./exam-schedule.component.scss'],
    imports: [CommonModule, ReactiveFormsModule],
    standalone: true
})
export class ExamScheduleComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private studentService:StudentMgmtService) { }
    examForm: FormGroup = this.formBuilder.group({
        title: ['']
    });
    examModels: IExamModel[] = [];
    ngOnInit(): void {
        this.get();
    }
    get() {
        debugger;
        this.studentService.getUpComingExams().subscribe(mod => {
            this.examModels = mod.data;
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