import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SettingsPageModule } from "../../../settings.module";
import { ActivatedRoute, Router } from "@angular/router";
import { IExamModel } from "src/app/shared/models/common-models/exam.model";
import { IQuestionModel, QuestionType } from "src/app/shared/models/common-models/question.model";
import { ExamMgmtService } from "src/app/shared/services/exam-mgmt.service";
import { QuestionMgmtService } from "src/app/shared/services/question-mgmt.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { HardCodedConstant } from "src/app/shared/constants/hardcoded-constant";
@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss'],
    imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
    standalone: true
})
export class EditQuestionComponent implements OnInit {
    questionId: any;
    constructor(
        private formBuilder: FormBuilder,
        private questionMgmtService: QuestionMgmtService,
        private examMgmtService: ExamMgmtService,
        private router: Router,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute
    ) {
        this.questionId = this.activatedRoute.snapshot.paramMap.get(HardCodedConstant.Id);
    }

    questionModel: IQuestionModel = {};
    getQuestions() {
        this.questionMgmtService.getById(this.questionId).subscribe(mod => {
            this.questionModel = mod.data;
            debugger;
            this.createQuestionForm.patchValue({
                text: this.questionModel.text,
                type: this.questionModel.type,
                examId: this.questionModel.examId,
                marks: this.questionModel.marks
            });
            if (this.questionModel.answerOptions && this.questionModel.answerOptions?.length > 0) {
                for (let counter = 0; counter < this.questionModel.answerOptions.length; counter++) {
                    this.addItem();
                    const answerOptionGroup = this.answerOptions.at(counter) as FormGroup; // Get the newly added control
                    answerOptionGroup.patchValue({
                        id: Number(this.questionModel.answerOptions[counter].id),
                        text: this.questionModel.answerOptions[counter].text,
                        isCorrect: this.questionModel.answerOptions[counter].isCorrect
                    });
                }
            }
        });
    }

    createQuestionForm: FormGroup = this.formBuilder.group({
        text: ['', [Validators.required]],
        type: ['', [Validators.required]],
        examId: [''],
        marks: ['', Validators.required],
        answerOptions: this.formBuilder.array([])
    });

    ngOnInit(): void {
        this.getExams();
        this.getQuestions();
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
            id: new FormControl('0'),
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
            model.id = Number(this.questionId);
            model.examId = Number(model.examId);
            model.marks=Number(this.createQuestionForm.get('marks')?.value)
            debugger;
            this.questionMgmtService.update(model).subscribe(mod => {
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