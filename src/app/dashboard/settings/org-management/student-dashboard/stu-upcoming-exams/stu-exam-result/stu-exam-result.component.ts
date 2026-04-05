import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StuFooterComponent } from '../../stu-footer/stu-footer.component';
import { OnGoingExamHeaderComponent } from '../ongoing-exam/ongoing-exam-header/ongoing-exam-header.component';
import { OnGoingExamLeftMenuComponent } from '../ongoing-exam/ongoing-exam-left-menu/ongoing-exam-left-menu.component';
import { StudentMgmtComponent } from '../../../student-mgmt/student-mgmt.component';
import { StudentMgmtService } from 'src/app/shared/services/student-mgmt.service';
import { HardCodedConstant } from 'src/app/shared/constants/hardcoded-constant';
import { IStudentExamResultModel } from 'src/app/shared/models/common-models/student-exam-result.model';

@Component({
  selector: 'app-stu-exam-result',
  templateUrl: './stu-exam-result.component.html',
  styleUrls: ['./stu-exam-result.component.scss'],
  imports: [
    CommonModule,
    OnGoingExamHeaderComponent,
    OnGoingExamLeftMenuComponent,
    RouterModule,
    StuFooterComponent,
    ReactiveFormsModule,
  ],
})
export class StuExamResultComponent implements OnInit {
   examId: any;
   resultModel:IStudentExamResultModel | undefined;
   feedback?:any;
  constructor(private studentService:StudentMgmtService,
     private activatedRoute: ActivatedRoute
  ) {
     this.examId = this.activatedRoute.snapshot.paramMap.get(
          HardCodedConstant.Id,
        );
  }
  ngOnInit(): void {
    this.bindResult();
  }
  bindResult(){
    this.studentService.getStudentExamResultById(this.examId).subscribe((res)=>{
      debugger;  
      this.resultModel = res.data;
      this.feedback = res?.chatResponse?.messages?.[0]?.contents?.[0]?.text ?? "No text available";
    });
  }
  
}