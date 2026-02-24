import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData, IResponseDataArray } from '../models/response.model';
import { CommonConstant } from '../constants/common-constant';
import { ISubjectModel } from '../models/common-models/subject.model';

@Injectable({
  providedIn: 'any',
})
export class SubjectService {
  constructor(private httpClient: HttpClient) {}
  get(): Observable<IResponseDataArray> {
    return this.httpClient.get<IResponseDataArray>(
      CommonConstant.baseAPIURL + CommonConstant.subjectAPIURL
    );
  }

  create(model: ISubjectModel): Observable<IResponseData> {
    return this.httpClient.post<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.subjectAPIURL,
      model
    );
  }

  getById(id: any): Observable<IResponseData> {
    return this.httpClient.get<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.subjectByIdAPIURL + id
    );
  }

  update(model: ISubjectModel): Observable<IResponseData> {
    return this.httpClient.put<IResponseData>(
      CommonConstant.baseAPIURL + CommonConstant.studentAPIURL,
      model
    );
  }
}
