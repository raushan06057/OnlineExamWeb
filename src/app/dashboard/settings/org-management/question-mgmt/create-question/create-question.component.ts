import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SettingsPageModule } from "../../../settings.module";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { QuestionType } from "src/app/shared/models/common-models/question.model";
import { QuestionMgmtService } from "src/app/shared/services/question-mgmt.service";
import { ExamMgmtService } from "src/app/shared/services/exam-mgmt.service";
import { IExamModel } from "src/app/shared/models/common-models/exam.model";
@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class CreateQuestionComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private questionMgmtService: QuestionMgmtService,
        private examMgmtService: ExamMgmtService,
        private router: Router,
        private toastService: ToastService
    ) { }

    createQuestionForm: FormGroup = this.formBuilder.group({
        text: ['', [Validators.required]],
        type: ['', [Validators.required]],
        examId: [''],
        marks: ['', Validators.required],
        answerOptions: this.formBuilder.array([])
    });

    ngOnInit(): void {
        this.getExams();
    }

    questionTypes: QuestionType[] = [];
    exams: IExamModel[] = [];
    getExams() {
        this.examMgmtService.get().subscribe(mod => {
            this.exams = mod.data;
        });
    }

    get answerOptions(): FormArray {
        return this.createQuestionForm.get('answerOptions') as FormArray;
    }

    addItem() {
        this.answerOptions.push(this.createOption()); // Add a new FormControl to the FormArray
    }

    removeItem(index: number) {
        this.answerOptions.removeAt(index); // Remove a FormControl from the FormArray
    }

    selectionChange(event: Event) {
        this.answerOptions.clear();
        const selectedOptions = (event.target as HTMLIonSelectElement).value;
        if ((selectedOptions == 1) || (selectedOptions == 3) || (selectedOptions == 4)) {
            this.addItem();
        }
    }
    // Method to create a new option group
    private createOption(): FormGroup {
        return this.formBuilder.group({
            text: new FormControl(''), // Input for text
            isCorrect: new FormControl(false) // Checkbox for checked status
        });
    }

    getFormArrayValues() {
        const values = this.answerOptions.value; // Get all values from the FormArray
        console.log('FormArray Values:', values);
        return values;
    }
    
    createQuestion() {
        if (this.createQuestionForm.valid) {
            const model = this.createQuestionForm.value;
            model.type = Number(model.type);
            debugger;
            this.questionMgmtService.create(model).subscribe(mod => {
                debugger;
                if (mod.success === true) {
                    this.router.navigate(['/dashboard/settings/question']);
                    this.toastService.displayToast(mod.message, 'success');
                } else {
                    this.toastService.displayToast(mod.message, 'danger');
                }
            });
        }
    }
}