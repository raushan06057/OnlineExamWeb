import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OnGoingExamHeaderComponent } from './ongoing-exam-header/ongoing-exam-header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StuFooterComponent } from '../../stu-footer/stu-footer.component';
import { OnGoingExamLeftMenuComponent } from './ongoing-exam-left-menu/ongoing-exam-left-menu.component';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { QuestionMgmtService } from 'src/app/shared/services/question-mgmt.service';
import {
  IAnswerOptionModel,
  IQuestionModel,
  QuestionType,
} from 'src/app/shared/models/common-models/question.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IExamModel } from 'src/app/shared/models/common-models/exam.model';
import { ExamMgmtService } from 'src/app/shared/services/exam-mgmt.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OnGoingExamService } from 'src/app/shared/services/ongoing-exam.service';

@Component({
  selector: 'app-ongoing-exam',
  templateUrl: './ongoing-exam.component.html',
  styleUrls: ['./ongoing-exam.component.scss'],
  imports: [
    CommonModule,
    OnGoingExamHeaderComponent,
    OnGoingExamLeftMenuComponent,
    RouterModule,
    StuFooterComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class OnGoingExamComponent implements OnInit {
  questionId: any = 0;
  currentIndex: any = 0;
  examId: any;
  constructor(
    private formBuilder: FormBuilder,
    private questionMgmtService: QuestionMgmtService,
    private examMgmtService: ExamMgmtService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private onGoingExamService: OnGoingExamService
  ) {
    this.examId = this.activatedRoute.snapshot.paramMap.get(
      HardCodedConstant.Id
    );
  }

  ngOnInit(): void {
    this.getExams();
    this.getQuestionsOfExam();
  }

  questionModel: IQuestionModel = {};
  questType: any;
  getQuestions() {
    if (this.answerOptions.controls.length > -1) {
      (this.createQuestionForm.get('answerOptions') as FormArray).clear();
    }
    this.questionMgmtService.getById(this.questionId).subscribe((mod) => {
      this.questionModel = mod.data;
      this.createQuestionForm.patchValue({
        id:this.questionModel.id,
        text: this.questionModel.text,
        type: this.questionModel.type,
        examId: this.questionModel.examId,
        marks: this.questionModel.marks,
      });
      this.questType = this.questionModel.type;
      if (
        this.questionModel.answerOptions &&
        this.questionModel.answerOptions?.length > 0
      ) {
        for (
          let counter = 0;
          counter < this.questionModel.answerOptions.length;
          counter++
        ) {
          this.addItem();
          const answerOptionGroup = this.answerOptions.at(counter) as FormGroup; // Get the newly added control
          answerOptionGroup.patchValue({
            id: Number(this.questionModel.answerOptions[counter].id),
            text: this.questionModel.answerOptions[counter].text,
            isCorrect: false, //this.questionModel.answerOptions[counter].isCorrect,
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
    answerOptions: this.formBuilder.array([]),
  });

  questions: IQuestionModel[] = [];
  getQuestionsOfExam() {
    this.questionMgmtService.getByExamId(this.examId).subscribe((mod) => {
      this.questions = mod.data;
      this.assignQuestionId();
      this.getQuestions();
    });
  }

  assignQuestionId() {
    this.questionId = this.questions[this.currentIndex].id;
  }

  questionTypes: QuestionType[] = [];
  exams: IExamModel[] = [];
  getExams() {
    this.examMgmtService.get().subscribe((mod) => {
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
    debugger;
    this.answerOptions.removeAt(index); // Remove a FormControl from the FormArray
  }

  selectionChange(event: Event) {
    this.answerOptions.clear();
    const selectedOptions = (event.target as HTMLIonSelectElement).value;
    if (selectedOptions == 1 || selectedOptions == 3 || selectedOptions == 4) {
      this.addItem();
    }
  }
  // Method to create a new option group
  private createOption(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl('0'),
      text: new FormControl(''), // Input for text
      isCorrect: new FormControl(false), // Checkbox for checked status
    });
  }
  getFormArrayValues() {
    const values = this.answerOptions.value; // Get all values from the FormArray
    console.log('FormArray Values:', values);
    return values;
  }

  previousQuest() {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
      this.createQuestion();
      this.assignQuestionId();
      this.getQuestions();
    }
  }

  nextQuest() {
    if (this.currentIndex > -1) {
      this.currentIndex = this.currentIndex + 1;
      this.createQuestion();
      this.assignQuestionId();
      this.getQuestions();
    }
  }

  onIsCorrectChange(event: any) {
    console.log(event);
    const answerOptionGroup = this.answerOptions.at(event) as FormGroup;
    // const id = event.target.id;
    var a = this.answerOptions;
  }
  selectedValRadio: any;
  onChange(event: any) {
    this.selectedValRadio = event;
  }

  createQuestion() {
    if (this.createQuestionForm.valid) {
      const model = this.createQuestionForm.getRawValue();
      model.QuestionId=this.questionModel.id;
      if (model.type == 3) {
        model.answerOptions[this.selectedValRadio].isCorrect = true;
      }
      this.onGoingExamService.post(model).subscribe((mod) => {
        // if (mod.success == true) {
        //   this.router.navigate(['/dashboard/settings/course-enrollment']);
        //   this.toastService.displayToast(mod.message, 'success');
        // } else {
        //   this.toastService.displayToast(mod.message, 'danger');
        // }
      });
      debugger;
      //   model.type = Number(model.type);
      //   model.id = Number(this.questionId);
      //   model.examId = Number(model.examId);
      //   model.marks = Number(this.createQuestionForm.get('marks')?.value);
      //   this.questionMgmtService.update(model).subscribe((mod) => {
      //     if (mod.success === true) {
      //       this.router.navigate(['/dashboard/settings/question']);
      //       this.toastService.displayToast(mod.message, 'success');
      //     } else {
      //       this.toastService.displayToast(mod.message, 'danger');
      //     }
      //   });
    }
  }
}
