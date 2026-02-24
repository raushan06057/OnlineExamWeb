import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-stu-exam-attempt',
    templateUrl:'./stu-exam-attempt.component.html',
    styleUrls:['./stu-exam-attempt.component.scss'],
    imports:[CommonModule],
    standalone:true
})
export class StuExamAttempt implements OnInit{
    constructor(){}
    ngOnInit(): void {
    }
    
}