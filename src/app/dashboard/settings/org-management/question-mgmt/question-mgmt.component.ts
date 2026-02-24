import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IQuestionModel, QuestionType } from "src/app/shared/models/common-models/question.model";
import { Router } from "@angular/router";
import { ExamMgmtService } from "src/app/shared/services/exam-mgmt.service";
import { IExamModel } from "src/app/shared/models/common-models/exam.model";
import { QuestionMgmtService } from "src/app/shared/services/question-mgmt.service";
@Component({
    selector: 'app-question-mgmt',
    templateUrl: './question-mgmt.component.html',
    styleUrls: ['./question-mgmt.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class QuestionMgmtComponent implements OnInit {
    questionModels: IQuestionModel[] = [];
    examModels: IExamModel[] = [];
QuestionType = QuestionType;
    constructor(private formBuilder: FormBuilder, private router: Router, private examService: ExamMgmtService,
        private questionMgmtService: QuestionMgmtService
    ) { }
    questionForm: FormGroup = this.formBuilder.group({
        examId: []
    });
    ngOnInit(): void {
        this.getExams();
        this.get();
    }
    get() {
        this.questionMgmtService.get().subscribe(mod => {
            debugger;
            this.questionModels = mod.data;
        });
    }
    getExams() {
        this.examService.get().subscribe(mod => {
            this.examModels = mod.data;
        });
    }
    searchQuestion() { }
    createQuestion() {
        this.router.navigate(['/dashboard/settings/create-question']);
    }
    editQuestion(id: any) {
        this.router.navigate(['/dashboard/settings/edit-question/' + id]);
    }
    deleteQuestion(id:any, text:any) { }
}