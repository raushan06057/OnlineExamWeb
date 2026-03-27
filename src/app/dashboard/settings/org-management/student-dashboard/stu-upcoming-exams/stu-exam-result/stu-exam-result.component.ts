import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StuFooterComponent } from "../../stu-footer/stu-footer.component";
import { OnGoingExamHeaderComponent } from "../ongoing-exam/ongoing-exam-header/ongoing-exam-header.component";

@Component({
    selector:'app-stu-exam-result',
    templateUrl:'./stu-exam-result.component.html',
    styleUrls:['./stu-exam-result.component.scss'],
    imports:[ CommonModule,
        OnGoingExamHeaderComponent,
        RouterModule,
        StuFooterComponent,
        ReactiveFormsModule,]
})
export class StuExamResultComponent {

}