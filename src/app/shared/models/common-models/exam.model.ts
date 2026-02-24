export interface IExamModel {
  id?: any;
  title?: string; // Optional property
  description?: string; // Optional property
  startDate?: Date;
  endDate?: Date;
  durationInMinutes?: number;
  organizationId?: number;
  orgName?:string;
  departmentId?: number;
  courseId?:number;
  subjectId?:number;
  totalMarks?: number;
  passingMarks?: number;
  isScheduled?: boolean;
}
