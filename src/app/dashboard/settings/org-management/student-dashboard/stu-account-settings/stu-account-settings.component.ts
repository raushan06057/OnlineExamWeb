import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-stu-account-settings',
    templateUrl:'./stu-account-settings.component.html',
    styleUrls:['./stu-account-settings.component.scss'],
    imports:[CommonModule],
    standalone:true
})
export class StuAccountSettingsComponent implements OnInit{
    ngOnInit(): void {
    }

}