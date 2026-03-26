export interface IStudentExamResultModel {
  id?: number;
  title?: string;
  description: string | null;
  startDate: string | Date | null;
  endDate: string | Date | null;
  durationInMinutes?: number;
  totalMarks?: number;
  passingMarks?: number;
  totalAttemptedQuestions?:number;
  totalCorrect?:number;
  marksObtained?:number;
}
