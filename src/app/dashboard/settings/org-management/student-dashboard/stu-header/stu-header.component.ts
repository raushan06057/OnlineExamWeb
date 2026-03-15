import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { KeyContants } from "src/app/shared/constants/key-constants";
import { DataTransferService } from "src/app/shared/services/data-transfer-service";

@Component({
    selector:'app-stu-header',
    templateUrl:'./stu-header.component.html',
    styleUrls:['./stu-header.component.scss'],
    imports:[RouterModule],
    standalone:true
})
export class StuHeaderComponent implements OnInit {
    username:any;
    constructor(private dataTransferService:DataTransferService){}
    ngOnInit(): void {
        this.username = this.dataTransferService.getData(KeyContants.Username)!=null?this.dataTransferService.getData(KeyContants.Username):'N/A';
    }
}