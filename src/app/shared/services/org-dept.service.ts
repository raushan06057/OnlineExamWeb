import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IResponseData, IResponseDataArray } from "../models/response.model";
import { Observable } from "rxjs";
import { CommonConstant } from "../constants/common-constant";
import { IOrgDeptModel } from "../models/common-models/org-dept.model";

@Injectable({
    providedIn: 'any'
})
export class OrgDeptService {
    constructor(private httpClient: HttpClient) { }
    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.orgDeptAPIURL);
    }

    create(orgDeptModel: IOrgDeptModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.orgDeptAPIURL, orgDeptModel);
    }

    getById(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.orgDeptByIdAPIURL + id);
    }

    update(orgDeptModel: IOrgDeptModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.orgDeptAPIURL, orgDeptModel);
    }
}