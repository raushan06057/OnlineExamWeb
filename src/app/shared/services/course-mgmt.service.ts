import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseData, IResponseDataArray } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";
import { ICourseModel } from "../models/common-models/course.model";

@Injectable({
    providedIn: 'any'
})
export class CourseMgmtService {
    constructor(private httpClient: HttpClient) { }
    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.courseAPIURL);
    }

    create(courseModel: ICourseModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseAPIURL, courseModel);
    }

    getById(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseByIdAPIURL + id);
    }

    update(courseModel: ICourseModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.courseAPIURL, courseModel);
    }
}