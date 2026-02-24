import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { LoginRequestModel } from "../models/request-models/login-request.model";
import { Observable } from "rxjs";
import { IResponseData } from "../models/response.model";
import { CommonConstant } from "../constants/common-constant";

@Injectable({
    providedIn: 'any'
})
export class LoginService {
    constructor(private httpClient: HttpClient) { }
    login(loginRequestModel: LoginRequestModel): Observable<IResponseData> {
        return this.httpClient.post<IResponseData>(CommonConstant.baseAPIURL + CommonConstant.userLoginURL, loginRequestModel);
    }
}