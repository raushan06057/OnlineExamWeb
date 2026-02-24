import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonConstant } from "../constants/common-constant";
import { ICourseModel } from "../models/common-models/course.model";
import { IResponseDataArray, IResponseData } from "../models/response.model";
import { IExamModel } from "../models/common-models/exam.model";

@Injectable({
    providedIn: 'any'
})
export class ExamMgmtService {
    constructor(private httpClient: HttpClient) { }
    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.examAPIURL);
    }

    create(model: ICourseModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.examAPIURL, model);
    }

    getById(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.examByIdAPIURL + id);
    }

    update(model: IExamModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.examAPIURL, model);
    }
}