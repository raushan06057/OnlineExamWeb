export interface IQuestionModel {
    id?: any;
    text?: string;
    type?: QuestionType;
    typeName?:string;
    examId?: any;
    examName?:any;
    orgName?:any;
    marks?: number;
    answerOptions?: IAnswerOptionModel[];
}

export enum QuestionType {
    MultipleChoice = 1,
    Essay = 2,
    TrueFalse = 3,
    FillInTheBlank = 4
}

export interface IAnswerOptionModel {
    id?:any;
    text?: string; // The '?' indicates that the property is optional
    isCorrect: boolean;
}