import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonConstant } from "../constants/common-constant";
import { HardCodedConstant } from "../constants/hardcoded-constant";
import { IStateModel } from "../models/common-models/state.model";
import { IResponseDataArray, IResponseData } from "../models/response.model";

@Injectable({
    providedIn:'any'
})
export class StudentDocumentService {
    apiURL:string=CommonConstant.baseAPIURL+ CommonConstant.studentDocumentsAPIURL;
    constructor(private http: HttpClient) { }

    getData(): Observable<IResponseDataArray> {
        return this.http.get<IResponseDataArray>(this.apiURL);
    }

    getStateById(id: any): Observable<IResponseData> {
        return this.http.get<IResponseData>(this.apiURL + HardCodedConstant.Slash + id);
    }
    
    seachData(searchText: any): Observable<IResponseDataArray> {
        return this.http.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.searchStudentDocumentsAPIURL + searchText);
    }

    create(model: IStateModel) {
        return this.http.post<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.statesAPIURL, model);
    }

    edit(model: IStateModel) {
        return this.http.put<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.statesAPIURL, model);
    }

    delete(id: any): Observable<IResponseData> {
        return this.http.delete<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.statesAPIURL + HardCodedConstant.Slash + id);
    }
}