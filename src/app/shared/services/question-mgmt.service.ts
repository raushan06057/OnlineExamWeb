import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IQuestionModel } from "../models/common-models/question.model";
import { CommonConstant } from "../constants/common-constant";
import { catchError, Observable, throwError } from "rxjs";
import { IResponseDataArray, IResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'any'
})
export class QuestionMgmtService {
    constructor(private httpClient: HttpClient) { }
    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.questionAPIURL);
    }

    // create(model: IQuestionModel): Observable<IResponseData> {
    //     return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.questionAPIURL, model);
    // }
    create(model: IQuestionModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.questionAPIURL, model);
        // return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.questionAPIURL, model)
        // .pipe(catchError(error=>{
        //     const resp={
        //         id:0,
        //         success:false,
        //         message:error?.error?.message || 'An unexpected error occurred.',
        //         data:null
        //     };
        //     return throwError(() => resp);
        // }))
    }
    getById(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.questionByIdAPIURL + id);
    }

    getByExamId(id: any): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.questionByExamIdAPIURL + id);
    }
    
    update(model: IQuestionModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.questionAPIURL, model);
    }
}