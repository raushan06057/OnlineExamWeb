import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'any'
})
export class DataTransferService {

    getData(key: any) {
        return localStorage.getItem(key);
    }

    setData(key: any, value: any) {
        localStorage.setItem(key, value);
    }

    killData(key: any){
        localStorage.removeItem(key);
    }
}