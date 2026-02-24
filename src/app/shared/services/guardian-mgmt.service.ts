import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonConstant } from "../constants/common-constant";
import { IOrgModel } from "../models/common-models/org.model";
import { IResponseDataArray, IResponseData } from "../models/response.model";

@Injectable({
    providedIn:'any'
})
export class GuardianMgmtService{
constructor(private httpClient: HttpClient) { }

    get(): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.guardianAPIURL);
    }

    create(orgModel: IOrgModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.guardianAPIURL, orgModel);
    }

    update(orgModel: IOrgModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.guardianAPIURL, orgModel);
    }
    
    getById(id: any) {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.guardianByIdAPIURL + id);
    }
}