import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonConstant } from "../constants/common-constant";
import { ICourseModel } from "../models/common-models/course.model";
import { IResponseDataArray, IResponseData } from "../models/response.model";
import { IStudentModel } from "../models/common-models/student.model";
import { ICourseEnrollmentModel } from "../models/common-models/course-enrollment.model";

@Injectable({
    providedIn: 'any'
})
export class CourseEnrollmentService {
       constructor(private httpClient: HttpClient) { }
        get(): Observable<IResponseDataArray> {
            return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.courseEnrollmentAPIURL);
        }
    
        create(model: ICourseEnrollmentModel): Observable<IResponseData> {
            return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseEnrollmentAPIURL, model);
        }
    
        getById(id: any): Observable<IResponseData> {
            return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseEnrollmentByIdAPIURL + id);
        }
    
        update(model: ICourseEnrollmentModel): Observable<IResponseData> {
            return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseEnrollmentAPIURL, model);
        }
}