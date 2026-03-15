import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { KeyContants } from "src/app/shared/constants/key-constants";
import { DataTransferService } from "src/app/shared/services/data-transfer-service";

@Component({
    selector:'app-ongoing-exam-header',
    templateUrl:'./ongoing-exam-header.component.html',
    styleUrls:['./ongoing-exam-header.component.scss'],
    imports:[CommonModule,RouterModule],
    standalone:true
})
export class OnGoingExamHeaderComponent implements OnInit {
    username:any;
    constructor(private dataTransferService:DataTransferService){}
    ngOnInit(): void {
        this.username = this.dataTransferService.getData(KeyContants.Username)!=null?this.dataTransferService.getData(KeyContants.Username):'No Header';
    } 

}