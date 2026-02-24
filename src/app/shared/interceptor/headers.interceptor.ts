import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeyContants } from "../constants/key-constants";
import { DataTransferService } from "../services/data-transfer-service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(private dataTransferService: DataTransferService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
    const authToken = this.dataTransferService.getData(KeyContants.Token)!=null?this.dataTransferService.getData(KeyContants.Token):'No Header';

    if(this.dataTransferService.getData(KeyContants.Token)){

    }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization','Bearer '+ authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
    }

}