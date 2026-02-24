import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseDataArray } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";

@Injectable({
    providedIn: 'any'
})
export class DepartmentService {
    constructor(private http: HttpClient) { }
    getDepartments(orgId:any):Observable<IResponseDataArray>{
        var a =CommonConstant.baseAPIURL+CommonConstant.departmentsByOrgId+orgId;
        console.log(a);
        return   this.http.get<IResponseDataArray>(CommonConstant.baseAPIURL+CommonConstant.departmentsByOrgId+orgId);
    }
}