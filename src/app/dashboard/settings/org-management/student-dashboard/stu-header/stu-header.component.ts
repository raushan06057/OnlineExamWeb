import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector:'app-stu-header',
    templateUrl:'./stu-header.component.html',
    styleUrls:['./stu-header.component.scss'],
    imports:[RouterModule],
    standalone:true
})
export class StuHeaderComponent implements OnInit {
    ngOnInit(): void {
    }
}