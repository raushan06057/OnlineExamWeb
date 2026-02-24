import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-exam-progress-tracking',
    templateUrl: './exam-progress-tracking.component.html',
    styleUrls: ['./exam-progress-tracking.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class ExamProgressTrackingComponent implements OnInit {
    ngOnInit(): void {
    }

}