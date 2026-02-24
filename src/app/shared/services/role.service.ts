import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseData, IResponseDataArray, IResponseModel } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";
import { IRoleModel } from "../models/common-models/role-model";
import { HardCodedConstant } from "../constants/hardcoded-constant";

@Injectable({
    providedIn: 'any'
})
export class RoleService {
    constructor(private httpClient: HttpClient) { }

    getRolesByOrgId(orgId: any): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.rolesByOrgIdAPIURL + orgId);
    }

    searchRoles(roleModel: IRoleModel): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.searchRoleAPIURL + roleModel.name);
    }

    createRole(roleModel: IRoleModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.rolesAPIURL, roleModel);
    }

    getRoleById(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.rolesAPIURL + HardCodedConstant.Slash + id);
    }

    editRole(roleModel: IRoleModel): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.rolesAPIURL, roleModel);
    }

    deleteRole(id: any) {
        return this.httpClient.delete<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.rolesAPIURL + HardCodedConstant.Slash + id);
    }
}