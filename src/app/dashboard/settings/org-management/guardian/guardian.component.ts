import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingsPageModule } from '../../settings.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGuardianModel } from 'src/app/shared/models/common-models/guardian.model';
import { Route, Router } from '@angular/router';
import { GuardianMgmtService } from 'src/app/shared/services/guardian-mgmt.service';
import { OrgMgmtService } from 'src/app/shared/services/org-mgmt.service';
import { IOrgModel } from 'src/app/shared/models/common-models/org.model';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss'],
  imports: [CommonModule, SettingsPageModule, ReactiveFormsModule],
  standalone: true,
})
export class GuardianComponent implements OnInit {
  guardians: IGuardianModel[] = [];
  orgs: IOrgModel[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private guardianMgmtService: GuardianMgmtService,
    private orgMgmtService: OrgMgmtService,
  ) {}

  ngOnInit(): void {
    this.get();
    this.getOrgs();
  }

  getOrgs() {
    this.orgMgmtService.get().subscribe((mod) => {
      this.orgs = mod.data;
    });
  }
  get() {
    this.guardianMgmtService.get().subscribe((mod) => {
      this.guardians = mod.data;
    });
  }

  guardianForm: FormGroup = this.formBuilder.group({
    mobile: ['', [Validators.required]],
  });

  searchGuardians() {}

  create() {
    this.router.navigate(['/dashboard/settings/create-guardian']);
  }

  edit(id: any) {
    this.router.navigate(['/dashboard/settings/edit-guardian/' + id]);
  }

  deleteOrg(id: any, name: any) {}
}