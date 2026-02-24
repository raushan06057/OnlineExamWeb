import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
    selector:'app-ongoing-exam-left-menu',
    templateUrl:'./ongoing-exam-left-menu.component.html',
    styleUrls:['./ongoing-exam-left-menu.component.scss'],
    imports:[CommonModule,RouterModule],
    standalone:true
})
export class OnGoingExamLeftMenuComponent implements OnInit{
    ngOnInit(): void {
        
    }

}