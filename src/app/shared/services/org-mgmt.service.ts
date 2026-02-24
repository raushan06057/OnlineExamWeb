import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseData, IResponseDataArray } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";
import { IOrgModel } from "../models/common-models/org.model";

@Injectable({
    providedIn: 'any'
})
export class OrgMgmtService {
    constructor(private httpClient: HttpClient) { }

    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.orgAPIURL);
    }

    create(orgModel: IOrgModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.orgAPIURL, orgModel);
    }

    update(orgModel: IOrgModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.orgAPIURL, orgModel);
    }
    
    getById(id: any) {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.getOrgByIdAPIURL + id);
    }
}