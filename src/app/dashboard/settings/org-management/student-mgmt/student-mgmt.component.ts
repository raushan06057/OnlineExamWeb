import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SettingsPageModule } from "../../settings.module";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IStudentModel } from "src/app/shared/models/common-models/student.model";
import { StudentMgmtService } from "src/app/shared/services/student-mgmt.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-student-mgmt',
    templateUrl: './student-mgmt.component.html',
    styleUrls: ['./student-mgmt.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, SettingsPageModule],
    standalone: true
})
export class StudentMgmtComponent implements OnInit {
    studentModels: IStudentModel[] = [];

    constructor(private studentMgmtService: StudentMgmtService, private formBuilder: FormBuilder, private router: Router) { }
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
        this.studentMgmtService.get().subscribe(mod => {
            this.studentModels = mod.data;
        });
    }
    searchStudent() { }
    createStudent() {
        this.router.navigate(['/dashboard/settings/create-student']);
    }
    editStudent(id: any) {
        this.router.navigate(['/dashboard/settings/edit-student/' + id]);
    }
    deleteStudent(id: any, firstName: any) { }
}