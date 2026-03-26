import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonConstant } from '../constants/common-constant';
import { ICourseModel } from '../models/common-models/course.model';
import { IResponseDataArray, IResponseData } from '../models/response.model';
import { IStudentModel } from '../models/common-models/student.model';

@Injectable({
  providedIn: 'any',
})
export class StudentMgmtService {
  constructor(private httpClient: HttpClient) {}
  get(): Observable<IResponseDataArray> {
    return this.httpClient.get<IResponseDataArray>(
      CommonConstant.baseAPIURL + CommonConstant.studentAPIURL,
    );
  }

  create(model: IStudentModel): Observable<IResponseData> {
    return this.httpClient.post<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.studentAPIURL,
      model,
    );
  }

  getById(id: any): Observable<IResponseData> {
    return this.httpClient.get<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.studentByIdAPIURL + id,
    );
  }

  update(model: IStudentModel): Observable<IResponseData> {
    return this.httpClient.put<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.studentAPIURL,
      model,
    );
  }

  getUpComingExams(): Observable<IResponseDataArray> {
    return this.httpClient.get<IResponseDataArray>(
      CommonConstant.baseAPIURL + CommonConstant.getUpComingExams,
    );
  }

    getStudentExamResults(): Observable<IResponseDataArray> {
    return this.httpClient.get<IResponseDataArray>(
      CommonConstant.baseAPIURL + CommonConstant.getStudentExamResults,
    );
  }
}
