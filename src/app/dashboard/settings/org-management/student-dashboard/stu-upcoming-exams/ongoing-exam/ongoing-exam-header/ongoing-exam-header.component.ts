import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector:'app-ongoing-exam-header',
    templateUrl:'./ongoing-exam-header.component.html',
    styleUrls:['./ongoing-exam-header.component.scss'],
    imports:[CommonModule,RouterModule],
    standalone:true
})
export class OnGoingExamHeaderComponent implements OnInit {
    ngOnInit(): void {
    } 

}