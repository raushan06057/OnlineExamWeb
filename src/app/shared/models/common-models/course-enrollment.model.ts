export interface ICourseEnrollmentModel {
    id?:any;
    studentId?: number;
    courseId?: number;
    enrollmentDate?: Date;
    completionDate?: Date; // Optional property
    grade?: string; // Optional property
    studentName?:string;
    courseName?:string;
    organizationId?:any;
}
