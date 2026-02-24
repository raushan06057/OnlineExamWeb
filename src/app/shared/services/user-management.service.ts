import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseData, IResponseDataArray } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";
import { HardCodedConstant } from "../constants/hardcoded-constant";
import { IResetPasswordModel } from "../models/request-models/reset-password.model";

@Injectable({
    providedIn: 'any'
})
export class UserManagementService {
    constructor(private httpClient: HttpClient) { }

    createUser(model: any): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.usersAPIURL, model);
    }

    getUsers(orgId: any): Observable<IResponseDataArray> {
        return this.httpClient.get<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.usersbyOrgIdAPIURL + orgId);
    }

    getUser(id: any): Observable<IResponseData> {
        return this.httpClient.get<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.userDetailsById + id);
    }

    editUser(model: any): Observable<IResponseData> {
        return this.httpClient.put<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.usersAPIURL, model);
    }

    searchUsers(model: any) {
        return this.httpClient.post<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.searchUsersAPIURL, model);
    }

    resetPassword(model: IResetPasswordModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseDataArray>(CommonConstant.baseAPIURL + CommonConstant.resetPasswordAPIURL, model);
    }

    deleteUser(id: any): Observable<IResponseData> {
        return this.httpClient.delete<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.usersAPIURL + HardCodedConstant.Slash + id);
    }
}