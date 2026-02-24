import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestionModel } from '../models/common-models/question.model';
import { IResponseData } from '../models/response.model';
import { CommonConstant } from '../constants/common-constant';

@Injectable({
  providedIn: 'any',
})
export class OnGoingExamService {
  constructor(private http: HttpClient) {}
  post(  questionModel: IQuestionModel){
    return this.http.post<IResponseData>(CommonConstant.baseAPIURL+CommonConstant.studentQuestionAttemptsAPIURL,questionModel);
  }
}
