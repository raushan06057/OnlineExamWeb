import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsPageModule } from '../../settings.module';
import { Router } from '@angular/router';
import { IStudentModel } from 'src/app/shared/models/common-models/student.model';
import { StudentMgmtService } from 'src/app/shared/services/student-mgmt.service';
import { ISubjectModel } from 'src/app/shared/models/common-models/subject.model';
import { SubjectService } from 'src/app/shared/services/subject.service';
@Component({
  selector: 'app-subject-mgmt',
  templateUrl: './subject-mgmt.component.html',
  styleUrls: ['./subject-mgmt.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, SettingsPageModule],
  standalone: true,
})
export class SubjectMgmtComponent implements OnInit {
   subjectModels: ISubjectModel[] = [];
  
      constructor(private subjectService: SubjectService, private formBuilder: FormBuilder, private router: Router) { }
      studentForm: FormGroup = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          middleName: [''],
          departmentId: [''],
          guardianId: []
      });
      ngOnInit(): void {
          this.get();
      }
      get() {
          this.subjectService.get().subscribe(mod => {
              this.subjectModels = mod.data;
          });
      }
      searchStudent() { }
      createSubject() {
          this.router.navigate(['/dashboard/settings/create-subject']);
      }
      editSubject(id: any) {
          this.router.navigate(['/dashboard/settings/edit-subject/' + id]);
      }
      deleteSubject(id: any, firstName: any) { }
}
